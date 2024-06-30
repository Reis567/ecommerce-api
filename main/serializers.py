from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = ['user', 'mobile', 'created_at', 'updated_at']




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
class ProductCommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Mostrar o nome do usuário no lugar do ID

    class Meta:
        model = ProductComment
        fields = ['id', 'product', 'user', 'comment', 'created_at', 'updated_at']

class ProductSerializer(serializers.ModelSerializer):
    condition = serializers.PrimaryKeyRelatedField(queryset=ProductCondition.objects.all())
    comments = ProductCommentSerializer(many=True, read_only=True)
    product_rating = serializers.StringRelatedField(many=True, read_only=True)
    photo_urls = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'price', 'title', 'vendor', 'category', 'detail', 
            'condition', 'comments', 'product_rating', 
            'photo_product1', 'photo_product2', 
            'photo_product3', 'photo_product4', 
            'photo_product5', 'photo_urls',
            'is_favorite'
        ]

    def get_photo_urls(self, obj):
        urls = []
        if obj.photo_product1:
            urls.append(obj.photo_product1.url)
        if obj.photo_product2:
            urls.append(obj.photo_product2.url)
        if obj.photo_product3:
            urls.append(obj.photo_product3.url)
        if obj.photo_product4:
            urls.append(obj.photo_product4.url)
        if obj.photo_product5:
            urls.append(obj.photo_product5.url)
        return urls

    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            user = request.user
            if user.is_authenticated:
                return Favorite.objects.filter(user=user, product=obj).exists()
        return False
class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRating
        fields = ['id','customer','product','rating','reviews','add_time']
class ProductDetailSerializer(serializers.ModelSerializer):
    product_rating = serializers.StringRelatedField(many=True, read_only=True)
    condition = serializers.PrimaryKeyRelatedField(queryset=ProductCondition.objects.all())

    class Meta:
        model = Product
        fields = ['id', 'price', 'title', 'vendor', 'category', 'detail','condition', 'product_rating']


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
class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = ['id','customer','address']
        depth = 1
        
class FavoriteSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Mostra o nome do usuário em vez do ID
    product = serializers.StringRelatedField()  # Mostra o título do produto em vez do ID

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'product', 'created_at']

