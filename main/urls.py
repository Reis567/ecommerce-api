from django.urls import path,include
from .views import *

urlpatterns = [
    path('vendors/', VendorList.as_view(), name='vendor-list'),
]
