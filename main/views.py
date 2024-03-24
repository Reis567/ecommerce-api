from django.shortcuts import render
from rest_framework import generics,permissions
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


from .serializers import *
from .models import *

class VendorListView(generics.ListAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorListSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        tags=['Vendors'],
        operation_summary="List Vendors",
        responses={200: VendorListSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        """
        List all vendors.

        This endpoint retrieves a list of all vendors available.
        """
        return super().get(request, *args, **kwargs)

class VendorCreateView(generics.CreateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        tags=['Vendors'],
        operation_summary="Create Vendor",
        request_body=VendorCreateSerializer,
        responses={201: VendorRetrieveSerializer},
    )
    def post(self, request, *args, **kwargs):
        """
        Create a new vendor.

        This endpoint allows you to create a new vendor.
        """
        return super().post(request, *args, **kwargs)

class VendorRetrieveView(generics.RetrieveAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorRetrieveSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        tags=['Vendors'],
        operation_summary="Retrieve Vendor",
        responses={200: VendorRetrieveSerializer},
    )
    def get(self, request, *args, **kwargs):
        """
        Retrieve a vendor.

        This endpoint retrieves details of a specific vendor.
        """
        return super().get(request, *args, **kwargs)

class VendorUpdateView(generics.UpdateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        tags=['Vendors'],
        operation_summary="Update Vendor",
        request_body=VendorUpdateSerializer,
        responses={200: VendorRetrieveSerializer},
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

    @swagger_auto_schema(
        tags=['Vendors'],
        operation_summary="Delete Vendor",
        responses={204: "No Content"},
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)