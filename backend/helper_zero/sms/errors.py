class TwilioInvalidKeyError (Exception):
	"""
	Error raised when environment variables used
	by Twilio are not set correctly locally
	"""
	pass

class TwilioSendError (Exception):
	"""
	Error raised when the Twilio client fails
	to send a specified message
	"""
	pass