from rest_framework import serializers
from .models import Organization
from .models import DonationRequest

class DonationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationRequest
        fields = ('org_id', 'item_type', 'amount_requested', 'amount_received')
class OrganizationSerializer(serializers.ModelSerializer):
    donation_requests = DonationRequestSerializer(many=True)
    class Meta:
        model = Organization

        fields = ('id', 'name', 'phone', 'org_type', 'email', 'is_dropoff_only',
        		  'instructions', 'zipcode', 'lat', 'lon', 'donation_requests')

