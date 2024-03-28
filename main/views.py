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

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    @extend_schema(
        description='Register a new user',
        request=UserSerializer,
        responses={201: UserSerializer},
    )
    def create(self, request, *args, **kwargs):
        """
        Register a new user.

        This endpoint allows you to register a new user.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)