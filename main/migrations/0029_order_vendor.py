# Generated by Django 5.0.2 on 2024-08-30 21:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0028_customeraddress_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='vendor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.vendor'),
        ),
    ]