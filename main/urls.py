from django.urls import path,include
from .views import *

urlpatterns = [
    path('vendors/', VendorListView.as_view(), name='vendor-list'),
    path('vendor/<int:pk>', VendorRetrieveView.as_view(), name='vendor-detail'),
    path('vendors/create/', VendorCreateView.as_view(), name='vendor-create'),
    path('vendors/<int:pk>/update/', VendorUpdateView.as_view(), name='vendor-update'),
    path('vendors/<int:pk>/delete/', VendorDestroyView.as_view(), name='vendor-delete'),
]
