from django.urls import path,include
from .views import *
from rest_framework import routers


router=routers.DefaultRouter()
router.register(r'address/create', CustomerAddressCreateViewSet, basename='customeraddress-create')
router.register(r'productrating' ,ProductRatingViewSet)
router.register(r'carts', CartViewSet, basename='cart')
urlpatterns = [
    ##Vendors
    path('vendors/', VendorListView.as_view(), name='vendor-list'),
    path('vendor/<int:pk>', VendorRetrieveView.as_view(), name='vendor-detail'),
    path('vendor/create/', VendorCreateView.as_view(), name='vendor-create'),
    path('vendor/<int:pk>/update/', VendorUpdateView.as_view(), name='vendor-update'),
    path('vendor/<int:pk>/delete/', VendorDestroyView.as_view(), name='vendor-delete'),
    path('vendor-products/', vendor_products, name='vendor_products'),
    path('vendor-products/<int:product_id>/delete/', delete_product, name='delete_product'),
    path('vendedor/orders/', vendor_order_list, name='vendedor-orders'),

    ## CUSTOMERS
    path('customer/orders/', customer_order_list, name='customer-order-list'),

    
    #Products
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('most-favorited-products/', most_favorited_products, name='most-favorited-products'),
    path('toggle-favorite/<int:product_id>/', toggle_favorite, name='toggle-favorite'),
    path('user-favorites/', user_favorites, name='user-favorites'),
    path('is-favorite/<int:product_id>/', is_favorite, name='is_favorite'),
    path('search-products/', product_search_view, name='product-search'),
    path('products/<int:product_id>/comments/', ProductCommentListCreate.as_view(), name='product-comments'),


    # Products category, condition, and tags
    path('categories/', ProductCategoryListView.as_view(), name='category-list'),
    path('conditions/', ProductConditionListView.as_view(), name='condition-list'),
    path('tags/', ProductTagListView.as_view(), name='tag-list'),
    path('categories/<int:pk>/',category_detail , name='category-detail'),

    ##Orders 
    path('orders/create/', order_create_view, name='order-create'),
    path('orders/<int:pk>/',order_detail_view, name='order-detail'),
    path('orders/<int:pk>/update/', order_update_view, name='order-update'),
    path('orders/<int:pk>/delete/', order_delete_view, name='order-delete'),
    path('calculate-shipping/', calculate_shipping, name='calculate_shipping'),

    ## Address
    path('address/', list_addresses, name='list_addresses'),
    path('address/<int:pk>/', update_address, name='update_address'),
    path('address/<int:pk>/delete/', delete_address, name='delete_address'),
    path('address/<int:pk>/set_favorite/', set_favorite_address, name='set_favorite_address'),


    # Data
    path('dashboard-data/', dashboard_data, name='dashboard_data'),
]
urlpatterns+=router.urls