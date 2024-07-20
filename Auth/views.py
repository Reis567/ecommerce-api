from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import generics,permissions
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .serializers import *
from rest_framework.views import APIView
class CustomTokenObtainPairView(TokenObtainPairView):
    @extend_schema(
        description='Obtain JWT token',
        tags=['Auth'],
        responses={200: 'JWT token obtained successfully'},
    )
    def post(self, request, *args, **kwargs):
        """
        Obtain JWT token.

        This endpoint allows you to obtain a JWT token by providing valid user credentials.
        """
        return super().post(request, *args, **kwargs)

class CustomTokenRefreshView(TokenRefreshView):
    @extend_schema(
        description='Refresh JWT token',
        tags=['Auth'],
        responses={200: 'JWT token refreshed successfully'},
    )
    def post(self, request, *args, **kwargs):
        """
        Refresh JWT token.

        This endpoint allows you to refresh a JWT token by providing a valid refresh token.
        """
        return super().post(request, *args, **kwargs)



class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    @extend_schema(
        description='Register a new user',
        tags=['Auth'],
        request=UserSerializer,
        responses={201: UserSerializer},
    )
    def post(self, request, *args, **kwargs):
        """
        Register a new user.

        This endpoint allows you to register a new user.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    @extend_schema(
        description='Retrieve the details of the authenticated user',
        tags=['Auth'],
        responses={200: UserSerializer},
    )
    def get(self, request, *args, **kwargs):
        """
        Retrieve the details of the authenticated user.

        This endpoint allows you to retrieve the details of the authenticated user.
        """
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UserMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)