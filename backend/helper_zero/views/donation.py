from datetime import datetime
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from helper_zero.serializers import DonationSerializer
from helper_zero.models import Donation, Organization

class DonationView(viewsets.ModelViewSet):
    serializer_class = DonationSerializer
    queryset = Donation.objects.all()

    def create(self, request):
        request_dict = request.data
        serializer = DonationSerializer(data=request_dict)
        if serializer.is_valid():
            org = Organization.objects.get(id=request_dict["org"])
            if request_dict["status"] is None:
                request_dict["status"] = "incomplete"
            # TODO: may need to parse donation time start & end
            donation = Donation(
                org=org,
                status=request_dict["status"],
                item_type=request_dict["item_type"],
                amount=request_dict["amount"],
                created_at=datetime.now(),
                donation_time_start=request_dict["donation_time_start"],
                donation_time_end=request_dict["donation_time_end"]
            )
            donation.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)
