from rest_framework import serializers
from .models import User, Organization, DonationRequest

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'name', 'phone', 'email', 'zipcode', 'lat', 'lon')

class OrganizationSerializer(serializers.ModelSerializer):
    donation_requests = DonationRequestSerializer(many=True)
    class Meta:
        model = Organization
        fields = ('id', 'name', 'phone', 'org_type', 'email', 'is_dropoff_only',
                  'instructions', 'zipcode', 'lat', 'lon', 'donation_requests')

class OrganizationSerializer(serializers.ModelSerializer):
    donation_requests = DonationRequestSerializer(many=True)
    class Meta:
        model = Organization
        fields = ('id', 'name', 'phone', 'org_type', 'email', 'is_dropoff_only',
        		  'instructions', 'zipcode', 'lat', 'lon', 'donation_requests')
