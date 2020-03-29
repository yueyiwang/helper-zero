import os
from rest_framework import status, viewsets
from rest_framework.response import Response
from google.oauth2 import id_token
from google.auth.transport import requests

from backend.helper_zero.models import Organization, DonationRequest
from backend.helper_zero.serializers import OrganizationSerializer, DonationRequestSerializer

class AuthView(viewsets.ViewSet):
  def list(self, request):
    auth_token = request.query_params.get('auth_token')
    id_info = id_token.verify_oauth2_token(auth_token, requests.Request(), os.environ['GOOGLE_CLIENT_ID'])
    if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
      return Response(status=status.HTTP_401_UNAUTHORIZED)
    user_id = id_info['sub']
    org_list = Organization.objects.filter(auth_user_id=user_id)]
    if len(org_list) != 1:
      return Response(status=status.HTTP_400_BAD_REQUEST)
    org = org_list.first()
    if org == None:
      return Response({})
    org_dict = OrganizationSerializer(org).data
    return Response(org_dict)
