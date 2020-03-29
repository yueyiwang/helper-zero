from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from backend.helper_zero.serializers import DonationRequestSerializer
from backend.helper_zero.models import DonationRequest, Organization

class DonationRequestView(viewsets.ModelViewSet):
    serializer_class = DonationRequestSerializer
    queryset = DonationRequest.objects.all()

    def create(self, request):
        request_dict = request.data
        serializer = DonationRequestSerializer(data=request_dict)
        if serializer.is_valid():
            if request_dict['amount_received'] is None:
                request_dict["amount_received"] = 0
            org = Organization.objects.get(id=request_dict["org"])
            donation_request = DonationRequest(
                org=org,
                item_type=request_dict["item_type"],
                amount_requested=request_dict["amount_requested"],
                amount_received=request_dict["amount_received"],
            )
            donation_request.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)
        

