from rest_framework import status, viewsets
from rest_framework.response import Response
from google.oauth2 import id_token
from google.auth.transport import requests

from helper_zero.models import Organization, DonationRequest
from helper_zero.serializers import OrganizationSerializer, DonationRequestSerializer

class AuthView(viewsets.ViewSet):

  def list(self, request):
    auth_token = request.query_params.get('auth_token')
    id_info = id_token.verify_oauth2_token(auth_token, requests.Request(), "650902157032-v1gqmd903sedgmdrpd0goa1343b049ug.apps.googleusercontent.com")
    if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
      return Response(status=status.HTTP_401_UNAUTHORIZED)
    user_id = id_info['sub']
    org = Organization.objects.filter(auth_user_id=user_id).first()
    if org == None:
      return Response({})
    org_dict = OrganizationSerializer(org).data
    return Response(org_dict)
