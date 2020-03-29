from rest_framework import status, viewsets
from rest_framework.response import Response

from helper_zero.models import Organization, DonationRequest

class AuthView(viewsets.ViewSet):

  ## retrieve will come in with an auth_token
  def retrieve(self, request, pk):
    auth_token = request.GET.get('auth_token')
    print(auth_token)
    org = Organization.objects.filter(auth_token=auth_token).first()
    if org == None:
      return Response()
    
    donation_requests = DonationRequest.objects.filter(org=org)
    org_to_donation_requests = {org: donation_requests}
    return Response(org_to_donation_requests)
