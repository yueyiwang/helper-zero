from rest_framework import serializers
from .models import User, Organization, DonationRequest

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'name', 'phone', 'email', 'zipcode', 'lat', 'lon')

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('id', 'name', 'phone', 'org_type', 'email', 'is_dropoff_only',
        		  'instructions', 'point_of_contact', 'zipcode', 'lat', 'lon')

class DonationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationRequest
        fields = ('org_id', 'item_type', 'amount_requested', 'amount_received')

