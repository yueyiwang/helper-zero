import os
import logging

from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from .errors import TwilioSendError, TwilioInvalidKeyError

class MessageSender:
	def __init__ (self):
		self.text_client = self._initializeTwilioClient()
		self.mail_client = self._initializeSendGridClient()

	def _initializeTwilioClient(self):
		try:
			twilio_sid = os.environ['TWILIO_ACCOUNT_SID']
			twilio_auth = os.environ['TWILIO_AUTH_TOKEN']
		except KeyError:
			raise TwilioInvalidKeyError
		return Client(twilio_sid, twilio_auth)

	def _initializeSendGridClient(self):
		try:
			sendgrid_api_key = os.environ['SENDGRID_API_KEY']
		except KeyError:
			raise TwilioInvalidKeyError
		return SendGridAPIClient(sendgrid_api_key)

	def send_text_message(self, recipient, msg):
		try:
			sender_num = os.environ['TWILIO_NUMBER']
			self.text_client.messages.create(
				body=msg,
				from_=sender_num,
				to=recipient
			)
		except KeyError:
			raise TwilioInvalidKeyError
		except Exception as e:
			logging.error(e)
			raise TwilioSendError

	def send_email(self, recipient, content):
		"""
		https://github.com/sendgrid/sendgrid-python

		TODO: Replace helperzerosf email address with
		one made for port.er
		"""
		message = Mail(
			from_email="helperzerosf@gmail.com",
			to_emails=recipient,
			subject="Port.er Donation Confirmation",
			html_content=content
		)
		try:
			# TODO: Potentially log the response
			# and raise error if it's a 4XX
			self.mail_client.send(message)
		except Exception as e:
			raise

message_sender = MessageSender()
