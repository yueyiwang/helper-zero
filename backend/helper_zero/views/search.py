from rest_framework import status, viewsets
from helper_zero.serializers import OrganizationSerializer, DonationRequestSerializer
from helper_zero.models import Organization
from helper_zero.models import DonationRequest
from rest_framework.response import Response
from helper_zero.location_util import get_search_bounding_box
from collections import defaultdict
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
        lat = float(lat) if lat else None
        lon = float(lon) if lon else None
        radius = request.query_params.get('radius', 10)
        zipcode = request.query_params.get('zipcode')

        delivery_values = [True] if delivery else [True, False]
        org_list = _get_ordered_org_list(
            zipcode, lat, lon, radius, delivery_values
        )
        donation_request_list = _get_donation_request_list(org_list, item_type) if org_list else []

        response = _build_search_response(org_list, donation_request_list)
        return Response(response)


def _build_search_response(org_list, donation_request_list):
    # if not org_list or not donation_request_list:
    #     return []

    org_id_to_donation_requests = defaultdict(list)
    for donation_request in donation_request_list:
        org_id = donation_request['org_id']
        org_id_to_donation_requests[org_id] += donation_request

    response = []
    for org in org_list:
        org_id = org['id']
        response_info = dict()
        response_info['org'] = org
        response_info['donation_requests'] = org_id_to_donation_requests[org_id]
        response += [response_info]
    print(response)
    return response


def _get_ordered_org_list(zipcode, lat, lon, radius, delivery_values):
    if zipcode:
        org_query_set = Organization.objects.filter(
            zipcode=zipcode,
            is_dropoff_only__in=delivery_values,
        ).order_by('name')
    elif lat and lon:
        tl_lon, tl_lat, br_lon, br_lat = get_search_bounding_box(lat, lon, radius)
        org_query_set = Organization.objects.filter(
            lat__lte=tl_lat,
            lat__gte=br_lat,
            lon__lte=tl_lon,
            lon__gte=br_lon,
            is_dropoff_only__in=delivery_values,
        ).order_by('name')
    else:
        org_query_set = Organization.objects.order_by('name')[:20]

    org_list = OrganizationSerializer(org_query_set, many=True).data
    sorted(org_list, key=lambda x: _get_distance(float(x['lat']), float(x['lon']), lat, lon))
    return org_list


def _get_donation_request_list(org_list, item_type):
    org_id_list = [org['id'] for org in org_list]
    donation_request_query_set = DonationRequest.objects.filter(
        org_id__in=org_id_list,
        item_type=item_type,
    )
    donation_request_list = DonationRequestSerializer(donation_request_query_set, many=True).data
    return donation_request_list


def _get_distance(x1, x2, y1, y2):
    if x1 and x2 and y1 and y2:
        return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    return float("inf")
