# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from helper_zero.views.organizations import OrganizationView
from helper_zero.views.users import UserView
from helper_zero.views.donation_request import DonationRequestView
from helper_zero.views.donations import DonationView
from helper_zero.views.search import SearchView

router = routers.DefaultRouter()
router.register(r'organizations', OrganizationView, 'organizations')
router.register(r'users', UserView, 'users')
router.register(r'search', SearchView, 'search')
router.register(r'donations', DonationView, 'donations')
router.register(r'donation_requests', DonationRequestView, 'donation_requests')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
