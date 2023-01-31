from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Order,OrderDetail


class OrderSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Order
        fields= '__all__'


