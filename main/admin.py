from django.contrib import admin
from .models import *



admin.site.register(Vendor)
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'category', 'vendor', 'created_at', 'updated_at')
    search_fields = ('title', 'category__name', 'vendor__name')
    list_filter = ('category', 'vendor', 'created_at', 'updated_at')
    filter_horizontal = ('tags',)  # Adiciona um widget horizontal para a seleção de tags

admin.site.register(ProductTag)
admin.site.register(Customer)
admin.site.register(ProductCategory)
admin.site.register(ProductCondition)
admin.site.register(ProductRating)
admin.site.register(CustomerAddress)