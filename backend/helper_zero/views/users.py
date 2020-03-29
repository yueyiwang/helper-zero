import logging

from rest_framework import status, viewsets
from helper_zero.serializers import UserSerializer
from helper_zero.models import User
from rest_framework import status
from rest_framework.response import Response

from helper_zero.sms.texts import message_sender as sender
from helper_zero.sms.errors import TwilioInvalidKeyError, TwilioSendError

class UserView(viewsets.ViewSet):

	def list (self, request):
		queryset = User.objects.all()
		serializer = UserSerializer(queryset, many=True)
		return Response(serializer.data)

	def create (self, request):
		request_dict = request.data
		serializer = UserSerializer(data=request_dict)
		if serializer.is_valid():
			# TODO: Write additional code for validating
			# fields in the serializer, e.g verifying
			# valid phone number using regex, lat / lon
			# formatting, etc.
			u = User(
				name=request_dict["name"],
			 	phone=request_dict["phone"],
			 	email=request_dict["email"],
			 	zipcode=request_dict["zipcode"],
			 	lat=request_dict["lat"],
			 	lon=request_dict["lon"]
			)
			try:
				_send_user_confirmation_text(request_dict)
				u.save()
				return Response(serializer.data)
			except TwilioInvalidKeyError:
				logging.error ("Twilio environment variables not properly configured")
				return Response(status=status.HTTP_400_BAD_REQUEST)
			except TwilioSendError:
				logging.error ("Twilio sender failed, please check your parameters")
				return Response(status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response(serializer.errors,
											status=status.HTTP_400_BAD_REQUEST)

def _send_user_confirmation_text (params):
	recipient = "+%s" % params["phone"]
	msg = "%s, thank you for signing up to Port.er!" % params["name"]

	try:
		sender.sendTextMessage (recipient, msg)
	except Exception as e:
		raise

