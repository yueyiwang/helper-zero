import logging
import uuid
import hashlib

from datetime import date, datetime, timedelta
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from backend.helper_zero.serializers import DonationSerializer
from backend.helper_zero.models import Donation, Organization, HashToDonation
from backend.helper_zero.sms.messages import message_sender as sender 
from backend.helper_zero.sms.errors import TwilioInvalidKeyError, TwilioSendError
from backend.helper_zero.scheduler.scheduler import scheduler

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
            donation = Donation(
                org=org,
                name=request_dict["name"],
                phone=request_dict["phone"],
                email=request_dict["email"],
                status=request_dict["status"],
                item=request_dict["item"],
                amount=request_dict["amount"],
                created_at=datetime.now(),
                city=request_dict["city"],
                pickup_address=request_dict["pickup_address"],
                delivery_type=request_dict["delivery_type"],
                pickup_or_dropoff_times=request_dict["pickup_or_dropoff_times"]
            )
            try:
                donation.save()

                # Hash donation and store it in the relevant table
                obj_uuid = uuid.uuid4().hex
                hash_key = hashlib.sha256(obj_uuid.encode()).hexdigest()
                print("Hash key: %s" % hash_key)
                hashToDonation = HashToDonation(
                    donation=donation,
                    hash_key=hash_key
                )
                hashToDonation.save()

                # Send an email confirming the donation that was just made
                # _send_user_confirmation_email(request_dict)

                # Schedule an email for some time in the future, setting
                # it to a short time from now for testing purposes
                # scheduler.add_job_with_datetime(
                #     _send_donation_confirmation_email,
                #     datetime.now() + timedelta(days=7),
                #     request_dict
                # )

                return Response(serializer.data)
            except TwilioInvalidKeyError:
                logging.error("Twilio environment variables not properly configured")
                return Response(status=status.HTTP_400_BAD_REQUEST)
            except TwilioSendError:
                logging.error("Twilio sender failed, please check your parameters")
                return Response(status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                logging.error(e)
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def _send_user_confirmation_text (params):
    recipient = "+%s" % params["phone"]
    msg = "%s, thank you for signing up to Port.er!" % params["name"]

    try:
        sender.send_text_message(recipient, msg)
    except Exception as e:
        raise

def _send_user_confirmation_email (params):
    msg = ("Welcome to port.er! This email is a confirmation of your "
           "donation. You are donating %d %s. We look forward to receiving "
           "your donation!" % (params["amount"], params["item"]))
    try:
        sender.send_email(params["email"], msg)
    except Exception as e:
        raise

def _send_donation_confirmation_email (params):
    msg = ("Hey %s, was your donation successful? Please click "
           "on the below link to help us update our "
           "donation information!" % (params["name"]))
    try:
        sender.send_email(params["email"], msg)
    except Exception as e:
        raise