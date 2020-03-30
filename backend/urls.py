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
from backend.helper_zero.views.confirm import ConfirmView


router = routers.DefaultRouter()
router.register(r'login', AuthView, 'login')
router.register(r'organizations', OrganizationView, 'organizations')
router.register(r'users', UserView, 'users')
router.register(r'search', SearchView, 'search')
router.register(r'donations', DonationView, 'donations')
router.register(r'donation_requests', DonationRequestView, 'donation_requests')

# donation_router = routers.DefaultRouter()
# donation_router.register(r'donation', TestView, 'test')

# Try routing with a specific function in the views folder, versus
# an actual view. Although I'm pretty sure passing in a view is a little better
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('confirm_donations/<str:hash_key>/', ConfirmView.as_view({'get': 'list'})),
    re_path(r'^', FrontendAppView.as_view()),
]

# localhost:8000/donation?hash=<hash>
