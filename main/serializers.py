from rest_framework import serializers
from .models import *

from Auth import serializers as AuthSeri


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

# Serializer for Customer model
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'ddd_mobile', 'mobile', 'addresses', 'created_at', 'updated_at']

# List serializer for Vendor model
class VendorListSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address', 'street', 'city', 'state', 'zip_code']
        depth = 1

# Retrieve serializer for Vendor model
class VendorRetrieveSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address', 'street', 'city', 'state', 'zip_code']
        depth = 1

# Create serializer for Vendor model
class VendorCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['user', 'address', 'street', 'city', 'state', 'zip_code']

# Update serializer for Vendor model
class VendorUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['user', 'address', 'street', 'city', 'state', 'zip_code']

# Destroy serializer for Vendor model
class VendorDestroySerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address', 'street', 'city', 'state', 'zip_code']
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
class ProductTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTag
        fields = ['name']

class ProductDetailSerializer(serializers.ModelSerializer):
    product_rating = serializers.StringRelatedField(many=True, read_only=True)
    condition = serializers.PrimaryKeyRelatedField(queryset=ProductCondition.objects.all())
    tags = ProductTagSerializer(many=True, read_only=True)
    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'price', 'title', 'vendor', 'category', 'detail', 'condition', 'product_rating', 'tags', 'images']

    def get_images(self, obj):
        return [
            obj.photo_product1.url if obj.photo_product1 else None,
            obj.photo_product2.url if obj.photo_product2 else None,
            obj.photo_product3.url if obj.photo_product3 else None,
            obj.photo_product4.url if obj.photo_product4 else None,
            obj.photo_product5.url if obj.photo_product5 else None,
        ]


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'title', 'detail']

class ProductConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCondition
        fields = ['id', 'condition']

class OrderSerializer(serializers.ModelSerializer):
    endereco_destino = serializers.PrimaryKeyRelatedField(queryset=CustomerAddress.objects.all())

    class Meta:
        model = Order
        fields = ['id', 'customer', 'order_time', 'status', 'total', 'endereco_destino', 'endereco_origem', 'produtos']


class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = ['id', 'customer', 'logradouro', 'numero', 'bairro', 'estado', 'pais', 'cep', 'favorite_address']
class VendorAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorAddress
        fields = ['id', 'vendor', 'street', 'number', 'complement', 'state', 'city', 'zip_code', 'country', 'favorite_address']
class FavoriteSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Mostra o nome do usuário em vez do ID
    product = serializers.StringRelatedField()  # Mostra o título do produto em vez do ID

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'product', 'created_at']



class ProductCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductComment
        fields = ['id', 'product', 'user', 'comment', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'items']



class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'

class ProductConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCondition
        fields = '__all__'

class ProductTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTag
        fields = '__all__'