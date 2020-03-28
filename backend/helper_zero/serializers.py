from rest_framework import serializers
from .models import Organization

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('id', 'name', 'phone', 'org_type', 'email', 'is_dropoff_only',
        		  'instructions', 'point_of_contact', 'zipcode', 'lat_lon')