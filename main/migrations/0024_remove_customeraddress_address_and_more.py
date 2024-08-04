# Generated by Django 5.0.2 on 2024-08-04 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0023_rename_default_address_customeraddress_favorite_address_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customeraddress',
            name='address',
        ),
        migrations.AddField(
            model_name='customeraddress',
            name='bairro',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='customeraddress',
            name='cep',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='customeraddress',
            name='estado',
            field=models.CharField(default='VAZIO', max_length=100),
        ),
        migrations.AddField(
            model_name='customeraddress',
            name='logradouro',
            field=models.CharField(default='VAZIO', max_length=255),
        ),
        migrations.AddField(
            model_name='customeraddress',
            name='numero',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='customeraddress',
            name='pais',
            field=models.CharField(default='VAZIO', max_length=100),
        ),
    ]
