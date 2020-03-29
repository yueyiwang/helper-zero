# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from helper_zero.views.organizations import OrganizationView
from helper_zero.views.users import UserView
from helper_zero.views.donation_request import DonationRequestView
from helper_zero.views.donations import DonationView
from helper_zero.views.search import SearchView

data_api_router = routers.DefaultRouter()
data_api_router.register(r'organizations', OrganizationView, 'organizations')
data_api_router.register(r'users', UserView, 'users')
data_api_router.register(r'donations', DonationView, 'donations')
data_api_router.register(r'donation_requests', DonationRequestView, 'donation_requests')

api_router = routers.DefaultRouter()
api_router.register(r'search', SearchView, 'search')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('data_api/', include(data_api_router.urls)),
] + api_router.urls