from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

ORDERSTATUS_CHOICES = [
        ('Esperando pagamento', 'Esperando pagamento'),
        ('Pagamento confirmado', 'Pagamento confirmado'),
        ('Nota fiscal emitida', 'Nota fiscal emitida'),
        ('Enviado', 'Enviado'),
        ('Entregue', 'Entregue'),
        ('Devolvido', 'Devolvido'),
        ('Cancelado', 'Cancelado'),
    ]









class Vendor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username
class VendorAddress(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name='vendor_addresses',default=1)
    street = models.CharField(max_length=255)
    number = models.CharField(max_length=20, null=True, blank=True)
    complement = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    favorite_address = models.BooleanField(default=False)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.street}, {self.number} - {self.city}, {self.state}, {self.zip_code}"

class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ddd_mobile = models.PositiveSmallIntegerField(default="021")
    mobile = models.CharField(max_length=255,blank=True, null=True)        # Campo para o número de telefone (apenas números)
    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username
class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_addresses')
    logradouro = models.CharField(max_length=255,default="VAZIO")
    numero = models.CharField(max_length=20, blank=True, null=True)
    bairro = models.CharField(max_length=255, blank=True, null=True)
    estado = models.CharField(max_length=100,default="VAZIO")
    pais = models.CharField(max_length=100,default="VAZIO")
    cep = models.CharField(max_length=20, blank=True, null=True)
    favorite_address = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'{self.logradouro}, {self.numero} - {self.bairro}, {self.estado}, {self.pais} - {self.cep}'
    
    
class ProductCategory(models.Model):
    title = models.CharField(max_length=255)
    detail = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(default=timezone.now) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class ProductCondition(models.Model):
    CONDITION_CHOICES = [
        ('new', 'Novo'),
        ('used', 'Usado'),
        ('refurbished', 'Recondicionado'),
    ]

    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.get_condition_display()


class ProductTag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True)
    condition=models.ForeignKey(ProductCondition, on_delete=models.SET_NULL, null=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    title = models.CharField(max_length=255, unique=True)
    detail = models.TextField(blank=True, null=True)
    photo_product1 = models.ImageField(upload_to='products/', blank=True, null=True)
    photo_product2 = models.ImageField(upload_to='products/', blank=True, null=True)
    photo_product3 = models.ImageField(upload_to='products/', blank=True, null=True)
    photo_product4 = models.ImageField(upload_to='products/', blank=True, null=True)
    photo_product5 = models.ImageField(upload_to='products/', blank=True, null=True)
    tags = models.ManyToManyField(ProductTag, related_name='products', blank=True)

    created_at = models.DateTimeField(default=timezone.now) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - ${self.price}"


    

class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.user} - {self.product}"
    



class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    order_time = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=ORDERSTATUS_CHOICES, default='Esperando pagamento', null=True, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    endereco_destino = models.ForeignKey(CustomerAddress, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders_as_destination')
    endereco_origem = models.CharField(max_length=255, null=True, blank=True)
    produtos = models.ManyToManyField('Product')

    def __str__(self):
        return f'Order {self.id} - {self.order_time}'


    
class ProductRating(models.Model):
    RATING_CHOICES = [
        (1, '1 Star'),
        (2, '2 Stars'),
        (3, '3 Stars'),
        (4, '4 Stars'),
        (5, '5 Stars'),
    ]
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True,related_name='rating_customers')
    product = models.ForeignKey(Product, on_delete=models.CASCADE,related_name='product_rating')
    rating = models.IntegerField(choices=RATING_CHOICES, validators=[MinValueValidator(1), MaxValueValidator(5)])
    reviews=models.TextField(null=True,blank=True)
    add_time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'{self.rating} Stars - {self.reviews} '
    
class ProductComment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.product.title}'
    

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)