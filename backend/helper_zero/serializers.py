from rest_framework import serializers
from .models import User, Organization, DonationRequest

class UserSerializer(serializers.ModelSerializer):
	lat = serializers.CharField(allow_null=True)
	lon = serializers.CharField(allow_null=True)
	zipcode = serializers.CharField(allow_null=True)

	class Meta:
		model = User
		fields = ('id', 'name', 'phone', 'email', 'zipcode', 'lat', 'lon')

class DonationRequestSerializer(serializers.ModelSerializer):
    amount_received = serializers.IntegerField(allow_null=True)
    class Meta:
        model = DonationRequest
        fields = ('org', 'item_type', 'amount_requested', 'amount_received')

class DonationSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(allow_null=True)
    status = serializers.CharField(allow_null=True)
    class Meta:
        model = Donation
        fields = ('org', 'status', 'item_type', 'amount', 'created_at', 'donation_time_start', 'donation_time_end')

class OrganizationSerializer(serializers.ModelSerializer):
    donation_requests = DonationRequestSerializer(many=True, required=False)
    class Meta:
        model = Organization
        fields = ('id', 'name', 'phone', 'org_type', 'email', 'is_dropoff_only',
        		  'instructions', 'zipcode', 'lat', 'lon', 'donation_requests')

