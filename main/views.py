from django.shortcuts import render
from .serializers import *
from rest_framework import generics,permissions
from .models import *


class VendorList(generics.ListAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes=[permissions.IsAuthenticated]

class VendorDetail(generics.RetrieveAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes=[permissions.IsAuthenticated]