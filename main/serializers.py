from rest_framework import serializers
from .models import *


class VendorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address']
        depth = 1
    

class VendorRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address']
        depth = 1

class VendorCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['user', 'address']

class VendorUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['user', 'address']

class VendorDestroySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address']
        depth = 1



class ProductSerializer(serializers.ModelSerializer):
    condition = serializers.PrimaryKeyRelatedField(queryset=ProductCondition.objects.all())

    class Meta:
        model = Product
        fields = ['id', 'price', 'title','vendor','category', 'detail', 'condition']

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'title', 'detail']

class ProductConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCondition
        fields = ['id', 'condition']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'customer', 'order_time']



class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ['id', 'order', 'product']