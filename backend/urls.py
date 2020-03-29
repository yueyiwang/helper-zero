# backend/urls.py

from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from backend.helper_zero.views.organizations import OrganizationView
from backend.helper_zero.views.users import UserView
from backend.helper_zero.views.donation_request import DonationRequestView
from backend.helper_zero.views.donations import DonationView
from backend.helper_zero.views.search import SearchView
from backend.helper_zero.views.auth import AuthView
from backend.helper_zero.views.frontend_app import FrontendAppView


router = routers.DefaultRouter()
router.register(r'login', AuthView, 'login')
router.register(r'organizations', OrganizationView, 'organizations')
router.register(r'users', UserView, 'users')
router.register(r'search', SearchView, 'search')
router.register(r'donations', DonationView, 'donations')
router.register(r'donation_requests', DonationRequestView, 'donation_requests')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    re_path(r'^', FrontendAppView.as_view()),
]
