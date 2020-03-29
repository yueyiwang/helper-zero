import logging

from rest_framework import status, viewsets
from backend.helper_zero.serializers import OrganizationSerializer, DonationRequestSerializer
from backend.helper_zero.models import Organization
from backend.helper_zero.location_util import get_search_bounding_box
from django.core.paginator import Paginator
from rest_framework.response import Response
import math


class SearchView(viewsets.ViewSet):
    """
    A ViewSet for search results.
    """

    def list(self, request):
        offset = int(request.query_params.get('offset', 0))
        item_type = request.query_params.get('item_type')
        location_params, org_filter_params, donation_request_filter_params = _process_params(request.query_params)

        try:
            org_search_results = _get_org_search_results(
                location_params, org_filter_params, donation_request_filter_params, offset
            )
            response = _filter_org_list_by_donation_requests(org_search_results, item_type)
            return Response(response)
        except Exception as e:
            logging.error(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


def _process_params(query_params):
    is_dropoff = query_params.get('is_dropoff')
    is_pickup = query_params.get('is_pickup')
    is_mail = query_params.get('is_mail')
    org_type = query_params.get('org_type')
    item_type = query_params.get('item_type')
    lat = query_params.get('lat')
    lon = query_params.get('lon')
    radius = query_params.get('radius', 10)
    zipcode = query_params.get('zipcode')

    location_params = {
        'zipcode': zipcode,
        'lat': float(lat) if lat else None,
        'lon': float(lon) if lon else None,
        'radius': radius,
    }
    org_filter_params = {}
    if org_type:
        org_filter_params['org_type'] = org_type
    if is_dropoff:
        org_filter_params['is_dropoff'] = bool(is_dropoff)
    if is_pickup:
        org_filter_params['is_pickup'] = is_pickup
    if is_mail:
        org_filter_params['is_mail'] = is_mail
    donation_request_filter_params = {}
    if item_type:
        donation_request_filter_params['item_type'] = item_type

    return location_params, org_filter_params, donation_request_filter_params


def _filter_org_list_by_donation_requests(org_search_results, item_type):
    response = []
    for org in org_search_results:
        if item_type:
            org['donation_requests'] = list(filter(lambda x: (x['item_type'] == item_type), org['donation_requests']))
        org['donation_requests'] = list(filter(lambda x: (x['amount_requested'] != x['amount_received']), org['donation_requests']))
        response += [org] if org['donation_requests'] else []
    return response


def _get_org_search_results(
        location_params,
        org_filter_params,
        donation_request_filter_params,
        offset
):
    zipcode = location_params.get('zipcode')
    lat = location_params.get('lat')
    lon = location_params.get('lon')
    radius = location_params.get('radius')

    if zipcode:
        org_query_set = _process_zipcode_query(zipcode, org_filter_params, donation_request_filter_params)
    elif lat and lon:
        org_query_set = _process_lat_lon_query(lat, lon, radius, org_filter_params, donation_request_filter_params)
    else:
        # If no location data, default to showing any orgs that have open requests, capping at 20
        org_query_set = _process_default_query(org_filter_params, donation_request_filter_params)

    org_search_results = OrganizationSerializer(org_query_set, many=True).data
    # Remove duplicates from query set.
    # This appears to be a known django issue with sqlite and filtering on models with FKs.
    org_search_results = [i for n, i in enumerate(org_search_results) if i not in org_search_results[n + 1:]]

    if lat and lon:
        # Order by closest to search location before pagination
        org_search_results.sort(key=lambda x: _get_distance(float(x['lat']), lat, float(x['lon']), lon))

    org_search_results = _paginate_results(org_search_results, offset)
    return org_search_results


def _process_zipcode_query(zipcode, org_filter_params, donation_request_filter_params):
    if donation_request_filter_params.get('item_type'):
        org_query_set = Organization.objects.filter(
            zipcode=zipcode,
            donation_requests__item_type=donation_request_filter_params['item_type'],
            **org_filter_params,
        )
    else:
        org_query_set = Organization.objects.filter(
            zipcode=zipcode,
            **org_filter_params,
        )
    return org_query_set


def _process_lat_lon_query(lat, lon, radius, org_filter_params, donation_request_filter_params):
    tl_lon, tl_lat, br_lon, br_lat = get_search_bounding_box(
        lat,
        lon,
        radius,
    )
    if donation_request_filter_params.get('item_type'):
        org_query_set = Organization.objects.filter(
            lat__lte=tl_lat,
            lat__gte=br_lat,
            lon__lte=tl_lon,
            lon__gte=br_lon,
            donation_requests__item_type=donation_request_filter_params['item_type'],
            **org_filter_params
        )
    else:
        org_query_set = Organization.objects.filter(
            lat__lte=tl_lat,
            lat__gte=br_lat,
            lon__lte=tl_lon,
            lon__gte=br_lon,
            **org_filter_params
        )
    return org_query_set


def _process_default_query(org_filter_params, donation_request_filter_params):
    if donation_request_filter_params.get('item_type'):
        org_query_set = Organization.objects.filter(
            donation_requests__isnull=False,
            donation_requests__item_type=donation_request_filter_params['item_type'],
            **org_filter_params
        ).order_by("name")[:20]
    else:
        org_query_set = Organization.objects.filter(
            donation_requests__isnull=False,
            **org_filter_params
        ).order_by("name")[:20]
    return org_query_set


def _paginate_results(org_search_results, offset):
    paginator = Paginator(org_search_results, 20)  # Show 20 orgs per page
    page_index = offset + 1
    if page_index > 1:
        # if we're not requesting the first page, make sure we have another valid page of results
        if paginator.page(page_index-1).has_next():
            return paginator.page(page_index)
        else:
            return []
    return org_search_results


def _get_distance(x1, x2, y1, y2):
    if x1 and x2 and y1 and y2:
        return math.sqrt((x2 - x1) ** 2.0 + (y2 - y1) ** 2.0)
    return float("inf")
