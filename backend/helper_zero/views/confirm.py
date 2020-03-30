from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from backend.helper_zero.serializers import DonationSerializer
from backend.helper_zero.models import Donation
from backend.helper_zero.models import HashToDonation

class ConfirmView(viewsets.ModelViewSet):
	serializer_class = DonationSerializer 
	queryset = Donation.objects.all()

	# 1. Receive the hash and perform a db lookup
	#	- Create a new model for storing hash -> donation foreign key
	# 2. Once the donation is retrieved, return that information to the
	# front end
	# 3. Have a route for POST requests, update donation request
	# model with new information
	def list(self, request, hash_key):
		# Multiple donations could have been made to this
		# hash key, need to handle that later
		hash_donation_mapping = HashToDonation.objects.filter(hash_key=hash_key)

		if len(hash_donation_mapping):
			donation = Donation.objects.get(id=hash_donation_mapping.donation)
			serializer = DonationSerializer(donation)
			return Response(serializer.data)
		else:
			return Response(status=status.HTTP_400_BAD_REQUEST)

	# When to generate the hash? When the user
	# creates a donation a hash should be calculated and stored