from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics,permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import *
from rest_framework.mixins import CreateModelMixin
from rest_framework.filters import SearchFilter
from django.db.models import Q
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from rest_framework.decorators import action
from .serializers import *
from .models import *
from django.http import JsonResponse
from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
import requests
from django.db import transaction
from django.utils.timezone import now, timedelta
from django.db.models import Count, Sum
from django.utils.timezone import now
from datetime import timedelta
from django.db.models.functions import TruncMonth
from rest_framework.exceptions import NotFound








def welcome(request):
    return JsonResponse({'message': 'Bem-vindo à API!'})


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
        return self.list(request, *args, **kwargs)

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

    @extend_schema(
        description='Partial update of a vendor',
        tags=['Vendors'],
        request=VendorUpdateSerializer,
        responses={200: VendorUpdateSerializer},
    )
    def patch(self, request, *args, **kwargs):
        """
        Partial update of a vendor.

        This endpoint allows you to partially update details of a specific vendor.
        """
        return super().patch(request, *args, **kwargs)


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

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer

    @extend_schema(
        description='List all products',
        tags=['Products'],
        responses={200: ProductSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        """
        List all products.

        This endpoint retrieves a list of all products available.
        """
        return super().get(request, *args, **kwargs)

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        description='Retrieve a product',
        tags=['Products'],
        responses={200: ProductSerializer()},
    )
    def get(self, request, *args, **kwargs):
        """
        Retrieve a product.

        This endpoint retrieves details of a specific product.
        """
        return super().get(request, *args, **kwargs)

@api_view(['GET'])
@permission_classes([AllowAny])
def product_search_view(request):
    """
    Search for products.

    This endpoint retrieves a list of products that match the search query.
    """
    search_query = request.query_params.get('search', '')
    print(f"Search query: {search_query}")

    queryset = Product.objects.all()
    if search_query:
        queryset = queryset.filter(
            Q(title__icontains=search_query) |
            Q(detail__icontains=search_query) |
            Q(tags__name__icontains=search_query)
        ).distinct()

    paginator = LimitOffsetPagination()
    paginated_queryset = paginator.paginate_queryset(queryset, request)
    serializer = ProductSerializer(paginated_queryset, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def category_detail(request, pk):
    # Buscando a categoria pelo ID
    category = get_object_or_404(ProductCategory, pk=pk)
    
    # Buscando os produtos relacionados a essa categoria
    products = Product.objects.filter(category=category)
    
    # Configurando a paginação
    paginator = LimitOffsetPagination()
    paginated_products = paginator.paginate_queryset(products, request)
    
    # Serializando os produtos paginados
    serializer = ProductSerializer(paginated_products, many=True)
    
    # Criando o JSON de resposta com informações da categoria e produtos paginados
    response_data = {
        'id': category.id,
        'title': category.title,
        'products': serializer.data,
        'next': paginator.get_next_link(),
        'previous': paginator.get_previous_link(),
    }
    
    return JsonResponse(response_data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def customer_order_list(request):
    user_id = request.user
    print(user_id)
    if user_id:
        try:
            customer = Customer.objects.get(user=user_id)
            print(str(customer))
        except Customer.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)
    try:
        orders = Order.objects.filter(customer_id=customer)
        print(str(orders))
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'error': 'Cliente não encontrado'}, status=status.HTTP_404_NOT_FOUND)

class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer

    @extend_schema(
        description="Create a new order",
        tags=['Orders'],
        request=OrderSerializer,
        responses={
            201: OrderSerializer,
            400: "Bad Request - Invalid data provided"
        },
    )
    def create(self, request, *args, **kwargs):
        """
        Create a new order.

        This endpoint allows you to create a new order by providing the required data.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_addresses(request):
    user_id = request.query_params.get('user_id')
    print(user_id)

    if user_id:
        try:
            customer = Customer.objects.get(user=user_id)
            print(str(customer))
        except Customer.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)
        
        addresses = CustomerAddress.objects.filter(customer=customer)
        print(str(addresses))
    else:
        addresses = CustomerAddress.objects.none()

    serializer = CustomerAddressSerializer(addresses, many=True)
    print(str(serializer))
    return Response(serializer.data)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def update_address(request, pk):
    user_id = request.query_params.get('user_id')  # Obtendo o user_id do frontend
    
    if not user_id:
        return Response({'error': 'User ID is missing.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        customer = Customer.objects.get(user=user_id)  # Obtendo o cliente a partir do user_id
    except Customer.DoesNotExist:
        return Response({'error': 'Customer not found.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        address = CustomerAddress.objects.get(pk=pk, customer=customer)  # Buscando o endereço específico para o cliente
    except CustomerAddress.DoesNotExist:
        return Response({'error': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CustomerAddressSerializer(address)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = CustomerAddressSerializer(address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_favorite_address(request, pk):
    user_id = request.query_params.get('user_id')
    
    if not user_id:
        return Response({'error': 'User ID is missing.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        customer = Customer.objects.get(user=user_id)
    except Customer.DoesNotExist:
        return Response({'error': 'Customer not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        address = CustomerAddress.objects.get(pk=pk, customer=customer)
    except CustomerAddress.DoesNotExist:
        return Response({'error': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)

    with transaction.atomic():
        CustomerAddress.objects.filter(customer=customer).update(favorite_address=False)
        address.favorite_address = True
        address.save()

    return Response({'status': 'Endereço definido como favorito'}, status=status.HTTP_200_OK)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_address(request, pk):
    user_id = request.query_params.get('user_id')
    
    if not user_id:
        return Response({'error': 'User ID is missing.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        customer = Customer.objects.get(user=user_id)
    except Customer.DoesNotExist:
        return Response({'error': 'Customer not found.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        address = CustomerAddress.objects.get(pk=pk, customer=customer)
    except CustomerAddress.DoesNotExist:
        return Response({'error': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)

    if address.is_favorite:
        return Response({'error': 'Cannot delete a favorite address. Please remove it from favorites first.'}, status=status.HTTP_400_BAD_REQUEST)

    address.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


class CustomerAddressCreateViewSet(GenericViewSet):
    serializer_class = CustomerAddressSerializer

    @action(detail=False, methods=['post'])
    def create_address(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        user = request.user
        # Garantir que o cliente existe ou criar um novo
        customer, created = Customer.objects.get_or_create(user=user)
        
        data = request.data.copy()
        data['customer'] = customer.id  # Corrigido para usar o ID do cliente
        
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @extend_schema(
        description="Retrieve details of a specific order",
        tags=["Orders"],
        responses={200: OrderSerializer()},
    )
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    

class OrderUpdateView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @extend_schema(
        description="Update an existing order (full or partial update)",
        tags=["Orders"],
        responses={200: OrderSerializer()},
    )
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)  # Permitir atualização parcial
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    



@extend_schema(
    description="Delete an existing order",
    tags=["Orders"],
    responses={204: "No content"},
)
@api_view(['DELETE'])
def order_delete_view(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        raise NotFound(detail="Order not found.")

    order.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class ProductRatingViewSet(ModelViewSet):
    serializer_class = ProductRatingSerializer
    queryset = ProductRating.objects.all()


class ProductCommentViewSet(ModelViewSet):
    queryset = ProductComment.objects.all()
    serializer_class = ProductCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)




    
@api_view(['GET'])
def most_favorited_products(request):
    # Query para obter os 4 produtos mais favoritados
    products = Product.objects.annotate(favorite_count=Count('favorite')).order_by('-favorite_count')[:4]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_favorite(request, product_id):
    user = request.user
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    favorite, created = Favorite.objects.get_or_create(user=user, product=product)

    if not created:
        # If the favorite already exists, remove it
        favorite.delete()
        return Response({'message': 'Product removed from favorites'}, status=status.HTTP_200_OK)

    return Response({'message': 'Product added to favorites'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_favorites(request):
    user = request.user
    favorites = Favorite.objects.filter(user=user)
    products = [favorite.product for favorite in favorites]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_favorite(request, product_id):
    user = request.user
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    is_favorite = Favorite.objects.filter(user=user, product=product).exists()
    return Response({'is_favorite': is_favorite})



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def vendor_products(request):
    user = request.user
    try:
        vendor = Vendor.objects.get(user=user)
        
        if request.method == 'GET':
            products = Product.objects.filter(vendor=vendor)
            serializer = ProductDetailSerializer(products, many=True)
            
            # Printar os campos de cada produto
            for product in products:
                print(f"Product ID: {product.id}")
                print(f"Price: {product.price}")
                print(f"Title: {product.title}")
                print(f"Vendor: {product.vendor}")
                print(f"Category: {product.category}")
                print(f"Detail: {product.detail}")
                print(f"Condition: {product.condition}")
                print(f"Product Rating: {[rating for rating in product.product_rating.all()]}")
                print(f"Tags: {[tag.name for tag in product.tags.all()]}")
                print(f"Images: {[product.photo_product1.url if product.photo_product1 else None, product.photo_product2.url if product.photo_product2 else None, product.photo_product3.url if product.photo_product3 else None, product.photo_product4.url if product.photo_product4 else None, product.photo_product5.url if product.photo_product5 else None]}")

            return Response(serializer.data)
        
        elif request.method == 'POST':
            data = request.data
            print(data)
            files = request.FILES
            print(files)

            # Create a new product instance
            serializer = ProductSerializer(data=data)
            
            if serializer.is_valid():
                product = serializer.save(vendor=vendor)

                # Handle image files separately
                for i in range(1, 6):
                    photo_key = f'photo_product{i}'
                    if photo_key in files:
                        photo_file = files[photo_key]
                        # Save the photo to the product
                        setattr(product, photo_key, photo_file)
                
                product.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Vendor.DoesNotExist:
        return Response({'error': 'Vendor not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, product_id):
    user = request.user
    try:
        product = Product.objects.get(id=product_id, vendor__user=user)
        product.delete()
        return Response({'message': 'Produto excluído com sucesso!'}, status=status.HTTP_204_NO_CONTENT)
    except Product.DoesNotExist:
        return Response({'error': 'Produto não encontrado ou você não tem permissão para excluí-lo.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    try:
        customer = Customer.objects.get(user=user)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Customer.DoesNotExist:
        return Response({'error': 'Customer profile not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class ProductCommentListCreate(generics.ListCreateAPIView):
    serializer_class = ProductCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return ProductComment.objects.filter(product_id=product_id).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, product_id=self.kwargs['product_id'])

class CartViewSet(ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def list_items(self, request):
        cart = Cart.objects.filter(user=request.user).first()
        if not cart:
            return Response({'items': [], 'total': 0})

        cart_items = CartItem.objects.filter(cart=cart)
        total = sum(item.product.price * item.quantity for item in cart_items)
        items = [
            {
                'id': item.id,
                'product_id': item.product.id,
                'product_image': item.product.photo_product1.url if item.product.photo_product1 else None,
                'product_name': item.product.title,
                'quantity': item.quantity,
                'price': item.product.price
            } for item in cart_items
        ]

        return Response({'items': items, 'total': total})

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        if not product_id:
            return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        cart, created = Cart.objects.get_or_create(user=request.user)
        product = get_object_or_404(Product, id=product_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        if not created:
            cart_item.quantity += int(quantity)
        cart_item.save()

        return Response({'status': 'item added'}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def remove_item(self, request, pk=None):
        cart = self.get_object()
        product_id = request.data.get('product_id')

        if not product_id:
            return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        cart_item = get_object_or_404(CartItem, cart=cart, product_id=product_id)
        cart_item.delete()

        return Response({'status': 'item removed'}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
def calculate_shipping(request):
    cep = request.data.get('cep')
    if not cep:
        return Response({'error': 'CEP is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Chamada à API de cálculo de frete da Melhor Envio
        freight_cost = get_freight_cost(cep)
        return Response({'freight': freight_cost}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def get_freight_cost(to_cep):
    url = 'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate'
    headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2E5OWQzY2Y3YmZhMWFhNzU5ODRkNzNiMGU3NWRjNGQ4MjYyNDkzYjY2MTJjMzA0MmY3NzEzM2M5NWFlMDFjMjNmNTY5MWEyOWY3ZGExOWUiLCJpYXQiOjE3MjIzNTMxOTguNDIyMzk2LCJuYmYiOjE3MjIzNTMxOTguNDIyMzk4LCJleHAiOjE3NTM4ODkxOTguNDA1MjEyLCJzdWIiOiI5Y2E1YTcxYi1lY2QzLTRjZDktYjRhNC0xOGMwOGI1NDI4ODMiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.NgkCixG2sKTMcj5y4-VDoi4_5M2rBVuy0R8RUcWUi1-qDu8PbdSndGhbLQAvRY6jYqut_89V9XToTSUBPl1rkiJhNtNOdRnbJleiwu-nvRefDgoR2MSfi_wUrPZ3UFG1yNPwcPohhjNfy_-_Ybt0CywIW0gQlsxypJxst2ooyhEgqcTnhQX76HHuaVOrnwhbHZnfIEpTIH1BR4U4dGgIAS7Gq6BzImGyax1xO6kbgcVvqjzbJchzaj3MYCGmgbcROozdT_60OnnFJFUeHAC30zQCzxHkws_DaiipQ_fAwzQ6RFiYEL21KrL_J3utp6eqRyA_BZyTCl70vYbwraV4bfmsBxbyYukC2CIDYt5XWLdlV3gjWOBexBIQbbWx3x0Kr3XS7vVyNj1zZIjK4Ncs0wIIbP4WAbsNn2lRDDaQhlCeTTz5JwTSWigM2LPLk9T0VyZ0FCvMEUynUWxXZzpRyDk6WjmSLBk6giiS_QidiVTiFGmz-BfsSkP7iOlhjg0-skOpT8EY-C6y0I1p-i09Rv0L086CqezE5fw6nhjPdGeOsho3bnwMrm6uqScf0-__B2H4pJVmNiDMyaNDraLQYB8QIgY25pBMvE0DQuKU1B9LruPRqqYw1OSWzbuIS5SB-W2pvSgUA3xWx_a3WGU3MrNfv4tkAs9XhRt8qnUf7Io',
        'Content-Type': 'application/json',
        'User-Agent': 'Aplicação matheusdosreis9@gmail.com'
    }
    payload = {
        "from": {
            "postal_code": "24930124"
        },
        "to": {
            "postal_code": to_cep
        },
        "package": {
            "height": 4,
            "width": 12,
            "length": 17,
            "weight": 0.3
        },
        "services": "1,2,3,4,7,11"
    }

    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    data = response.json()

    # Processa a resposta conforme necessário
    if isinstance(data, list):
        return data
    else:
        raise Exception('Freight cost not found in the response')
    



class ProductCategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer

class ProductConditionListView(generics.ListAPIView):
    queryset = ProductCondition.objects.all()
    serializer_class = ProductConditionSerializer

class ProductTagListView(generics.ListAPIView):
    queryset = ProductTag.objects.all()
    serializer_class = ProductTagSerializer




@api_view(['GET'])
def dashboard_data(request):
    user = request.user
    try:
        vendor = Vendor.objects.get(user=user)
    except Vendor.DoesNotExist:
        return Response({'error': 'Vendedor não encontrado'}, status=404)
    
    # Obtenha as ordens associadas ao vendedor
    orders = Order.objects.filter(vendor=vendor).distinct()

    # Vendas por Categoria
    vendas_por_categoria = orders.values('produtos__category__title').annotate(total_vendas=Count('produtos')).order_by('-total_vendas')
    vendas_por_categoria_data = [{'category': item['produtos__category__title'], 'total': item['total_vendas']} for item in vendas_por_categoria]

    # Vendas por Mês
    vendas_por_mes = orders.filter(order_time__year=now().year).annotate(
        month=TruncMonth('order_time')  # Truncar para o mês
    ).values('month').annotate(total=Count('id')).order_by('month')

    vendas_por_mes_data = [{'month': item['month'].strftime('%m'), 'total': item['total']} for item in vendas_por_mes]


    # Vendas nas Últimas Semanas
    today = now().date()
    vendas_ultimas_semanas = []
    for i in range(4):
        start_date = today - timedelta(days=today.weekday(), weeks=i)
        end_date = start_date + timedelta(days=6)
        vendas_na_semana = orders.filter(order_time__date__range=[start_date, end_date]).count()
        vendas_ultimas_semanas.append({'week': f'Semana {i + 1}', 'total': vendas_na_semana})

    # Vendas do Dia
    vendas_do_dia = orders.filter(order_time__date=today).values('produtos__category__title').annotate(total=Count('id'))
    vendas_do_dia_data = [{'category': item['produtos__category__title'], 'total': item['total']} for item in vendas_do_dia]

    # Total de Vendas
    total_vendas = orders.count()

    # Vendas do Mês
    vendas_mes = orders.filter(order_time__month=now().month, order_time__year=now().year).count()

    # Vendas da Semana
    vendas_semana = orders.filter(order_time__date__gte=today - timedelta(days=today.weekday())).count()

    # Vendas do Dia
    vendas_dia = orders.filter(order_time__date=today).count()

    data = {
        'vendas_por_categoria': vendas_por_categoria_data,
        'vendas_por_mes': vendas_por_mes_data,
        'vendas_ultimas_semanas': vendas_ultimas_semanas,
        'vendas_do_dia': vendas_do_dia_data,
        'total_vendas': total_vendas,
        'vendas_mes': vendas_mes,
        'vendas_semana': vendas_semana,
        'vendas_dia': vendas_dia,
    }
    return Response(data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def vendor_order_list(request):
    user = request.user
    
    # Tenta obter o vendedor associado ao usuário autenticado
    try:
        vendor = Vendor.objects.get(user=user)
    except Vendor.DoesNotExist:
        return Response({'error': 'Vendedor não encontrado'}, status=status.HTTP_404_NOT_FOUND)

    # Filtra os pedidos associados ao vendedor
    orders = Order.objects.filter(vendor=vendor)
    
    # Serializa os pedidos
    serializer = OrderSerializer(orders, many=True)
    
    # Retorna os pedidos em formato JSON
    return Response(serializer.data, status=status.HTTP_200_OK)