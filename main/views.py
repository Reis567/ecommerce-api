from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import generics,permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample

from .serializers import *
from .models import *

class VendorRetrieveView(generics.RetrieveAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorRetrieveSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        description='Retrieve a vendor',
        responses={200: VendorRetrieveSerializer},
        tags=['Vendors'],
    )

    def get(self, request, *args, **kwargs):
        """
        Retrieve a vendor.

        This endpoint retrieves details of a specific vendor.
        """
        return super().get(request, *args, **kwargs)


class VendorListView(generics.ListAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorListSerializer
    permission_classes = [permissions.IsAuthenticated]
   
    @extend_schema(
        description='List all vendors',
        tags=['Vendors'],
        parameters=[
            OpenApiParameter(name='user', description='Filter by user ID', required=False, type=int),
            OpenApiParameter(name='address', description='Filter by address', required=False, type=str),
        ],
        responses={200: VendorListSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        """
        List all vendors.

        This endpoint retrieves a list of all vendors available.
        """
        return self.list(request, *args, **kwargs)

class VendorCreateView(generics.CreateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
            description='Create a new vendor',
            tags=['Vendors'],
            request=VendorCreateSerializer,
            responses={201: VendorCreateSerializer},
        )
    def post(self, request, *args, **kwargs):
        """
        Create a new vendor.

        This endpoint allows you to create a new vendor.
        """
        return super().post(request, *args, **kwargs)


class VendorUpdateView(generics.UpdateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        description='Update a vendor',
        tags=['Vendors'],
        request=VendorUpdateSerializer,
        responses={200: VendorUpdateSerializer},
    )
    def put(self, request, *args, **kwargs):
        """
        Update a vendor.

        This endpoint allows you to update details of a specific vendor.
        """
        return super().put(request, *args, **kwargs)

    @extend_schema(
        description='Partial update of a vendor',
        tags=['Vendors'],
        request=VendorUpdateSerializer,
        responses={200: VendorUpdateSerializer},
    )
    def patch(self, request, *args, **kwargs):
        """
        Partial update of a vendor.

        This endpoint allows you to partially update details of a specific vendor.
        """
        return super().patch(request, *args, **kwargs)


class VendorDestroyView(generics.DestroyAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorDestroySerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        description='Delete a vendor',
        tags=['Vendors'],
        responses={204: 'No content'},
    )
    def delete(self, request, *args, **kwargs):
        """
        Delete a vendor.

        This endpoint allows you to delete a specific vendor.
        """
        return super().delete(request, *args, **kwargs)

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @extend_schema(
        description='List all products',
        tags=['Products'],
        responses={200: ProductSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        """
        List all products.

        This endpoint retrieves a list of all products available.
        """
        return super().get(request, *args, **kwargs)

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @extend_schema(
        description='Retrieve a product',
        tags=['Products'],
        responses={200: ProductSerializer()},
    )
    def get(self, request, *args, **kwargs):
        """
        Retrieve a product.

        This endpoint retrieves details of a specific product.
        """
        return super().get(request, *args, **kwargs)

class ProductCategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer

    @extend_schema(
        description='List all product categories',
        tags=['Products'],
        responses={200: ProductCategorySerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        """
        List all product categories.

        This endpoint retrieves a list of all product categories available.
        """
        return super().get(request, *args, **kwargs)

class ProductCategoryDetailView(generics.RetrieveAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer

    @extend_schema(
        description='Retrieve a product category',
        tags=['Products'],
        responses={200: ProductCategorySerializer()},
    )
    def get(self, request, *args, **kwargs):
        """
        Retrieve a product category.

        This endpoint retrieves details of a specific product category.
        """
        return super().get(request, *args, **kwargs)
    
class CustomerOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer

    @extend_schema(
        description='Retrieve a List of orders from a especific customer',
        tags=['Orders'],
        responses={200: OrderSerializer()},
    )
    def get_queryset(self):
        # Obtenha o ID do cliente da URL
        customer_id = self.kwargs['customer_id']
        # Filtrar os pedidos pelo ID do cliente
        queryset = Order.objects.filter(customer_id=customer_id)
        return queryset