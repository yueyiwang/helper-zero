from rest_framework import status, viewsets
from helper_zero.serializers import OrganizationSerializer
from helper_zero.models import Organization


class OrganizationView(viewsets.ModelViewSet):
    serializer_class = OrganizationSerializer
    queryset = Organization.objects.all()
