from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User
from ..models import Vendor

class TestSetup(APITestCase):
    def setUp(self):
        # Criação de um usuário de teste
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Criação de fornecedores de teste
        self.vendor1 = Vendor.objects.create(user=self.user, adress='Test Address 1')
        self.vendor2 = Vendor.objects.create(user=self.user, adress='Test Address 2')

        # Configuração das URLs de teste
        self.vendor_list_url = reverse('vendor-list')

