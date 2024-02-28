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
    price = models.DecimalField(max_digits=10, decimal_places=2)
    title = models.CharField(max_length=255, unique=True)
    detail = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} - ${self.price}"