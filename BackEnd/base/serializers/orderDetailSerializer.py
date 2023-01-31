from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import OrderDetail


class OrderDetailSerializer(serializers.ModelSerializer):
    order_id=serializers.CharField(source='order_id.order_total_price')
    class Meta:
        model = OrderDetail
        fields = '__all__'
