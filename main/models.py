from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
# Vendor models

class Vendor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.TextField(null=True)

    created_at = models.DateTimeField(default=timezone.now) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username


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


    created_at = models.DateTimeField(default=timezone.now) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - ${self.price}"

class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mobile = models.PositiveBigIntegerField()

    created_at = models.DateTimeField(default=timezone.now) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_time = models.DateTimeField(auto_now_add=True)

    created_at = models.DateTimeField(default=timezone.now) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.order_time)

class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    created_at = models.DateTimeField(default=timezone.now) 
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product.title
    
class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,related_name='customer_addresses')
    address=models.TextField()
    default_address = models.BooleanField(default=False)

    def __str__(self):
        return self.address
    
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