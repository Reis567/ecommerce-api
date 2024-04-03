from django.db import models
from django.contrib.auth.models import User
# Vendor models

class Vendor(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    address = models.TextField(null=True)

    def __str__(self):
        return self.user.username

class ProductCategory(models.Model):
    title = models.CharField(max_length=255)
    detail = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL,null=True)
    vendor = models.ForeignKey(Vendor,on_delete=models.SET_NULL,null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    title = models.CharField(max_length=255, unique=True)
    detail = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} - ${self.price}"
    
class Customer(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    mobile=models.PositiveBigIntegerField()

    def __str__(self):
        return self.user.username

class Order(models.Model):
    customer=models.ForeignKey(Customer, on_delete=models.CASCADE)
