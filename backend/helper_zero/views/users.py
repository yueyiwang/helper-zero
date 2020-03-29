import logging

from rest_framework import status, viewsets
from helper_zero.serializers import UserSerializer
from helper_zero.models import User
from rest_framework import status
from rest_framework.response import Response

class UserView(viewsets.ViewSet):

	def list (self, request):
		queryset = User.objects.all()
		serializer = UserSerializer(queryset, many=True)
		return Response(serializer.data)

	def create (self, request):
		request_dict = request.data
		serializer = UserSerializer(data=request_dict)
		if serializer.is_valid():
			try:
				u = User(
					name=request_dict["name"],
				 	phone=request_dict["phone"],
				 	email=request_dict["email"],
				 	zipcode=request_dict["zipcode"],
				 	lat=request_dict["lat"],
				 	lon=request_dict["lon"]
				)
				u.save()
				return Response(serializer.data)
			except Exception as e:
				logging.error(e)
				return Response(status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response(serializer.errors,
							status=status.HTTP_400_BAD_REQUEST)

