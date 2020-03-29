from rest_framework import status, viewsets
from rest_framework.response import Response

from helper_zero.models import Organization, DonationRequest
from helper_zero.serializers import OrganizationSerializer, DonationRequestSerializer

class AuthView(viewsets.ViewSet):

  ## retrieve will come in with an auth_token
  def list(self, request):
    auth_token = request.GET.get('auth_token')
    org = Organization.objects.filter(auth_token=auth_token).first()
    if org == None:
      return Response([])
    org_dict = OrganizationSerializer(org).data
    return Response(org_dict)
