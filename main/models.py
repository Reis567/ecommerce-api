from django.db import models
from django.contrib.auth.models import User
# Vendor models

class Vendor(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    adress = models.TextField(null=True)

class ProductCategory(models.Model):
    title = models.CharField(max_length=255)
    detail = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title