from django.db import models
from django.contrib.auth.models import User
# Vendor models

class Vendor(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    adress = models.TextField(null=True)