from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class VendorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address']
        depth = 1
    

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id','user', 'address']
        depth=1

class VendorCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['user', 'address']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user