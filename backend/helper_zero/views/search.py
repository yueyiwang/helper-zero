from rest_framework import status, viewsets
from helper_zero.serializers import OrganizationSerializer, DonationRequestSerializer
from helper_zero.models import Organization
from helper_zero.models import DonationRequest
from rest_framework.response import Response
from helper_zero.location_util import get_search_bounding_box
from collections import defaultdict


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

        if not (zipcode or (lat and lon)):
            return Response(None)

        delivery_values = [True] if delivery else [True, False]
        organizations = _get_organizations(
            zipcode, lat, lon, radius, delivery_values
        )
        org_ordered_list = OrganizationSerializer(organizations, many=True).data
        org_id_list = [org['id'] for org in org_ordered_list]

        donation_requests = DonationRequest.objects.filter(
            org_id__in=org_id_list,
            item_type=item_type,
        )
        donation_requests_ordered_list = DonationRequestSerializer(donation_requests, many=True).data

        response = _build_search_response(org_ordered_list, donation_requests_ordered_list)
        return Response(response)


def _build_search_response(org_ordered_list, donation_requests_ordered_list):
    org_id_to_donation_requests = defaultdict(list)
    for donation_request in donation_requests_ordered_list:
        org_id = donation_request['org_id']
        org_id_to_donation_requests[org_id] += donation_request

    response = {}
    for org in org_ordered_list:
        org_id = org['id']
        response_info = dict()
        response_info['org'] = org
        response_info['donation_requests'] = org_id_to_donation_requests[org_id]
        response[org_id] = response_info
    return response


def _get_organizations(zipcode, lat, lon, radius, delivery_values):
    if zipcode:
        organizations = Organization.objects.filter(
            zipcode=zipcode,
            is_dropoff_only__in=delivery_values,
        ).order_by('name')
    else:
        # Otherwise, use lat and lon
        tl_lon, tl_lat, br_lon, br_lat = get_search_bounding_box(lat, lon, radius)
        organizations = Organization.objects.filter(
            lat__lte=tl_lat,
            lat__gte=br_lat,
            lon__lte=tl_lon,
            lon__gte=br_lon,
            is_dropoff_only__in=delivery_values,
        ).order_by('name')

    # TODO sort by closest to search location
    return organizations
