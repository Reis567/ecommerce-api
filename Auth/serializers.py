from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from ..main.models import *


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

