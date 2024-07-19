from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics,permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import *
from rest_framework.filters import SearchFilter
from django.db.models import Q
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample

from .serializers import *
from .models import *
from django.http import JsonResponse
from django.db.models import Count

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

    print(f"Filtered queryset: {queryset}")
    serializer = ProductSerializer(queryset, many=True)
    return Response(serializer.data)


class ProductCategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        description='List all product categories',
        tags=['Products'],
        responses={200: ProductCategorySerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        """
        List all product categories.

        This endpoint retrieves a list of all product categories available.
        """
        return super().get(request, *args, **kwargs)

class ProductCategoryDetailView(generics.RetrieveAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        description='Retrieve a product category',
        tags=['Products'],
        responses={200: ProductCategorySerializer()},
    )
    def get(self, request, *args, **kwargs):
        """
        Retrieve a product category.

        This endpoint retrieves details of a specific product category.
        """
        return super().get(request, *args, **kwargs)
    
class CustomerOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer

    @extend_schema(
        description='Retrieve a List of orders from a especific customer',
        tags=['Orders'],
        responses={200: OrderSerializer()},
    )
    def get_queryset(self):
        # Obtenha o ID do cliente da URL
        customer_id = self.kwargs['customer_id']
        # Filtrar os pedidos pelo ID do cliente
        queryset = Order.objects.filter(customer_id=customer_id)
        return queryset
    

class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer

    @extend_schema(
        description="Create a new order",
        tags=['Orders'],
        request=OrderSerializer,
        responses={
            201: OrderSerializer(),
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
            # Salvar o pedido no banco de dados
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
    
class OrderDeleteView(generics.DestroyAPIView):
    queryset = Order.objects.all()

    @extend_schema(
        description="Delete an existing order",
        tags=["Orders"],
        responses={204: "No content"},
    )
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CustomerAddressViewSet(ModelViewSet):
    serializer_class = CustomerAddressSerializer
    queryset = CustomerAddress.objects.all()
    


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def vendor_products(request):
    user = request.user
    try:
        vendor = Vendor.objects.get(user=user)
        products = Product.objects.filter(vendor=vendor)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except Vendor.DoesNotExist:
        return Response({'error': 'Vendor not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
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
        print(self.request.user)
        print(self.kwargs['product_id'])
        serializer.save(user=self.request.user, product_id=self.kwargs['product_id'])