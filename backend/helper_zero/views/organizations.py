import os
import logging
from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from backend.helper_zero.serializers import OrganizationSerializer
from backend.helper_zero.models import Organization
from rest_framework.response import Response
from django.forms.models import model_to_dict

from google.oauth2 import id_token
from google.auth.transport import requests
from geopy.geocoders import Nominatim

class OrganizationView(viewsets.ViewSet):

	def list(self, request):
		queryset = Organization.objects.all()
		serializer = OrganizationSerializer (queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request, pk=None):
		queryset = Organization.objects.all()
		org = get_object_or_404(queryset, pk=pk)
		serializer = OrganizationSerializer(org)
		return Response(serializer.data)

	def create(self, request):
		request_dict = request.data
		# Frontend doesn't need to pass in lat/lon
		request_dict['lat'] = ''
		request_dict['lon'] = ''

		serializer = OrganizationSerializer(data=request_dict)
		if serializer.is_valid():
			auth_token = request_dict["auth_token"]
			id_info = id_token.verify_oauth2_token(
				auth_token,
				requests.Request(),
				os.environ['GOOGLE_CLIENT_ID']
			)
			if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
				return Response(status=status.HTTP_401_UNAUTHORIZED)
			user_id = id_info['sub']
			geolocator = Nominatim(user_agent="porter")
			# Example address: 140 New Montgomery San Francisco, CA 94105
			street = request_dict["address"]
			city = request_dict["city"]
			address = street + " " + city
			location = geolocator.geocode(address)
			if not location:
				logging.error("Invalid location")
				return Response(status=status.HTTP_400_BAD_REQUEST)

			org = Organization(
				name=request_dict["name"],
				url=request_dict["url"],
				address=request_dict["address"],
				description=request_dict["description"],
				phone=request_dict["phone"],
				org_type=request_dict["org_type"],
				email=request_dict["email"],
				is_dropoff=request_dict["is_dropoff"],
				is_pickup=request_dict["is_pickup"],
				is_mail=request_dict["is_mail"],
				pickup_instructions=request_dict["pickup_instructions"],
				zipcode=request_dict["zipcode"],
				lat=location.latitude,
				lon=location.longitude,
				auth_user_id=user_id,
				pickup_times=request_dict["pickup_times"],
				dropoff_times=request_dict["dropoff_times"],
				dropoff_instructions=request_dict["dropoff_instructions"],
				mail_instructions=request_dict["mail_instructions"]
			)
			org.save()
			org_obj = model_to_dict(org)
			return Response(org_obj)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)