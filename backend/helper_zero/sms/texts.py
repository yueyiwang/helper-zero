import os
import logging

from twilio.rest import Client
from .errors import TwilioSendError, TwilioInvalidKeyError

class TwilioMessageSender:
	def __init__ (self):
		self.client = self._initializeTwilioClient()

	def _initializeTwilioClient (self):
		try:
			twilio_sid = os.environ['TWILIO_ACCOUNT_SID']
			twilio_auth = os.environ['TWILIO_AUTH_TOKEN']
		except KeyError:
			raise TwilioInvalidKeyError
		return Client(twilio_sid, twilio_auth)

	def sendTextMessage (self, recipient, msg):
		print(recipient)
		print(msg)
		try:
			sender_num = os.environ['TWILIO_NUMBER']
			self.client.messages.create(
				body=msg,
				from_=sender_num,
				to=recipient
			)
		except KeyError:
			raise TwilioInvalidKeyError
		except Exception as e:
			logging.error (e)
			raise TwilioSendError

message_sender = TwilioMessageSender()