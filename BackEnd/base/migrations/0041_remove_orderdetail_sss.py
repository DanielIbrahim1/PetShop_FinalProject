# Generated by Django 4.0.6 on 2023-01-20 18:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0040_orderdetail_sss'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderdetail',
            name='sss',
        ),
    ]