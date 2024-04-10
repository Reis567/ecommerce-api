from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
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
    Customer = models.ForeignKey(Customer, on_delete=models.CASCADE,relato_name='customer_addresses')
    address=models.TextField()

    def __str__(self):
        return self.product.title
    
