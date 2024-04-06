from django.urls import path,include
from .views import *

urlpatterns = [

    ##Vendors
    path('vendors/', VendorListView.as_view(), name='vendor-list'),
    path('vendor/<int:pk>', VendorRetrieveView.as_view(), name='vendor-detail'),
    path('vendor/create/', VendorCreateView.as_view(), name='vendor-create'),
    path('vendor/<int:pk>/update/', VendorUpdateView.as_view(), name='vendor-update'),
    path('vendor/<int:pk>/delete/', VendorDestroyView.as_view(), name='vendor-delete'),

    #Products
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),

    ##Products category
    path('categories/', ProductCategoryListView.as_view(), name='category-list'),
    path('categories/<int:pk>/', ProductCategoryDetailView.as_view(), name='category-detail'),

    ##Orders 
    path('customers/<int:customer_id>/orders/', CustomerOrderListView.as_view(), name='customer-order-list'),
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('orders/<int:pk>/update/', OrderUpdateView.as_view(), name='order-update'),
]
