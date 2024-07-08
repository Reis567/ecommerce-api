# Generated by Django 5.0.2 on 2024-07-08 11:27

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0018_favorite'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(max_length=255)),
                ('number', models.CharField(blank=True, max_length=20, null=True)),
                ('complement', models.CharField(blank=True, max_length=255, null=True)),
                ('state', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('zip_code', models.CharField(max_length=20)),
                ('country', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='vendor',
            name='address',
        ),
        migrations.AddField(
            model_name='customer',
            name='addresses',
            field=models.ManyToManyField(blank=True, to='main.useraddress'),
        ),
        migrations.AddField(
            model_name='vendor',
            name='addresses',
            field=models.ManyToManyField(blank=True, to='main.useraddress'),
        ),
    ]
