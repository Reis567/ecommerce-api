# Generated by Django 5.0.2 on 2024-08-06 08:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0025_customer_ddd_mobile_alter_customer_mobile'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserAddress',
            new_name='VendorAddress',
        ),
    ]
