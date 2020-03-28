import os

from rest_framework import status, viewsets
from helper_zero.serializers import UserSerializer
from helper_zero.models import User
from rest_framework import status
from rest_framework.response import Response

from twilio.rest import Client

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
				_send_twilio_confirmation_text(request_dict)
				u.save()
				return Response(serializer.data)
			except TwilioSendError:
				return Response(status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response(serializer.errors,
											status=status.HTTP_400_BAD_REQUEST)

class TwilioSendError(Exception):
	pass

def _send_twilio_confirmation_text (params):
	"""
	Uses Twilio client to send a text message.
	TODO: Instantiate client in UserView class to avoid
	having to reauthenticate on each text
	TODO: Move TwilioSendError to centralized location
	for errors
	TODO: Update serializer to validate that user submitted
	phone numbers are in the right format
	"""
	try:
		c = Client(os.environ['TWILIO_ACCOUNT_SID'],
				   os.environ['TWILIO_AUTH_TOKEN'])
		text = "%s, thank you for signing up to Port.er!" % params["name"]
		c.messages.create(
			body=text,
			from_=os.environ['TWILIO_NUMBER'],
			to='+%s' % (params["phone"])
		)
	except Exception as e:
		raise TwilioSendError ("Couldn't send SMS; please validate your "
							   					 "phone number and set the proper environment variables")

