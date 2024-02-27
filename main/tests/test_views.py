from rest_framework.test import APITestCase
from django.urls import reverse
from ..models import Vendor
from .test_setup import TestSetup

class TestVendorViews(TestSetup):
    def test_vendor_list_view(self):
        response = self.client.get(self.vendor_list_url)
        self.assertEqual(response.status_code, 200)