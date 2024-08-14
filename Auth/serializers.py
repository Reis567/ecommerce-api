from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from main.models import *
from main.serializers import *


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    user_type = serializers.ChoiceField(choices=[('vendor', 'Vendor'), ('customer', 'Customer')], write_only=True)
    mobile = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'user_type', 'mobile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user_type = validated_data.pop('user_type')
        mobile = validated_data.pop('mobile', None)
        
        if 'username' not in validated_data:
            validated_data['username'] = validated_data['email']
        
        user = User(
            username=validated_data['username'],
            email=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        if user_type == 'vendor':
            Vendor.objects.create(user=user)
        elif user_type == 'customer':
            Customer.objects.create(user=user, mobile=mobile)
        
        return user

class UserDetailSerializer(serializers.ModelSerializer):
    customer_addresses = CustomerAddressSerializer(many=True, read_only=True)
    vendor_addresses = VendorAddressSerializer(many=True, read_only=True)
    user_type = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'first_name', 
            'last_name', 
            'email',
            'phone', 
            'photo',
            'user_type',
            'customer_addresses',
            'vendor_addresses'
        ]

    def get_user_type(self, obj):
        if hasattr(obj, 'customer'):
            return 'customer'
        elif hasattr(obj, 'vendor'):
            return 'vendor'
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if representation['user_type'] == 'customer':
            representation['addresses'] = CustomerAddressSerializer(instance.customer.customer_addresses.all(), many=True).data
        elif representation['user_type'] == 'vendor':
            representation['addresses'] = VendorAddressSerializer(instance.vendor.vendor_addresses.all(), many=True).data
        else:
            representation['addresses'] = []

        return representation
