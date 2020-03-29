from rest_framework import status, viewsets
from helper_zero.serializers import OrganizationSerializer, DonationRequestSerializer
from helper_zero.models import Organization
from django.core.paginator import Paginator
from rest_framework.response import Response
from helper_zero.location_util import get_search_bounding_box
import math


class SearchView(viewsets.ViewSet):
    """
    A ViewSet for search results.
    """

    def list(self, request):
        delivery = request.query_params.get('delivery', False)
        item_type = request.query_params.get('item_type')
        lat = request.query_params.get('lat')
        lon = request.query_params.get('lon')
        radius = request.query_params.get('radius', 10)
        zipcode = request.query_params.get('zipcode')
        offset = int(request.query_params.get('offset', 0))

        lat = float(lat) if lat else None
        lon = float(lon) if lon else None
        delivery_values = [True] if delivery else [True, False]

        org_search_results = _get_org_search_results(
            zipcode, lat, lon, radius, delivery_values, offset
        )

        response = _filter_org_list_by_donation_requests(org_search_results, item_type)
        return Response(response)


def _filter_org_list_by_donation_requests(org_search_results, item_type):
    response = []
    for org in org_search_results:
        if item_type:
            org['donation_requests'] = list(filter(lambda x: (x['item_type'] == item_type), org['donation_requests']))
        org['donation_requests'] = list(filter(lambda x: (x['amount_requested'] != x['amount_received']), org['donation_requests']))
        response += [org] if org['donation_requests'] else []
    return response


def _get_org_search_results(zipcode, lat, lon, radius, delivery_values, offset):
    if zipcode:
        org_query_set = Organization.objects.filter(
            zipcode=zipcode,
            is_dropoff_only__in=delivery_values,
        )
    elif lat and lon:
        tl_lon, tl_lat, br_lon, br_lat = get_search_bounding_box(lat, lon, radius)
        org_query_set = Organization.objects.filter(
            lat__lte=tl_lat,
            lat__gte=br_lat,
            lon__lte=tl_lon,
            lon__gte=br_lon,
            is_dropoff_only__in=delivery_values,
        )
    else:
        # If no location data, default to showing any orgs that have open requests, capping at 20
        org_query_set = Organization.objects.filter(
            donation_requests__isnull=False
        ).order_by("name")[:20]

    org_search_results = OrganizationSerializer(org_query_set, many=True).data
    # Remove duplicates from query set.
    # This appears to be a known django issue with sqlite and filtering on models with FKs.
    org_search_results = [i for n, i in enumerate(org_search_results) if i not in org_search_results[n + 1:]]

    if lat and lon:
        # Order by closest to search location
        org_search_results.sort(key=lambda x: _get_distance(float(x['lat']), lat, float(x['lon']), lon))

    org_search_results = _paginate_results(org_search_results, offset)
    return org_search_results


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
