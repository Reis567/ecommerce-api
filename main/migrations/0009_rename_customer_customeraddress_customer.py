# Generated by Django 5.0.2 on 2024-04-12 16:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_customeraddress_default_address'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customeraddress',
            old_name='Customer',
            new_name='customer',
        ),
    ]
