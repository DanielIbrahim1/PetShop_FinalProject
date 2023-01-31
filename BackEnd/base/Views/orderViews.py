# checkout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse, JsonResponse
from ..models import Profile, Category, Order, Product, OrderDetail
from rest_framework.response import Response
from ..serializers import categorySerializer, productSerializer, orderSerializer, orderDetailSerializer
import datetime


@api_view(['POST'])
def addToOrders(request):
    user = request.user
    order_total_price = 0
    
    for item in request.data:
        total_price = item["total_price"]
        order_total_price += int(total_price)
    order = Order.objects.create(
        user=user, order_total_price=order_total_price )

    for item in request.data:
        product = Product.objects.get(_id=item['_id'])
        amount = item["amount"]
        total_price = item["total_price"]
        photo=item["photo"]
        OrderDetail.objects.create(
            order_id=order, product=product, amount=amount, total_price=total_price,photo=photo,order_total_price=order.order_total_price)

    return Response('order made')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allOrders(request):
    user = request.user
    print(user.is_staff)
    if user.is_staff is True:
        orders = Order.objects.all()
    else:
        orders = user.order_set.all()
    serializer = orderSerializer.OrderSerializer(orders, many=True)
    return Response(serializer.data)

# order details get


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderDetails(request, id=0):
    order_id = Order.objects.get(_id=id)
    orderDetails = OrderDetail.objects.filter(order_id=order_id)
    serializer = orderDetailSerializer.OrderDetailSerializer(
        orderDetails, many=True)
    return Response(serializer.data)
