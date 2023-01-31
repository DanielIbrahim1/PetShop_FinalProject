from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import HttpResponse, JsonResponse
from ..models import Profile, Category, Order, Product, OrderDetail
from rest_framework.response import Response
from ..serializers import categorySerializer, productSerializer, orderSerializer

''' Done '''
# add category by admin


@api_view(['POST'])
@permission_classes([IsAdminUser])  # only for admin
def add_category(request):
    Category.objects.create(name=request.data['name'], user=request.user)
    return JsonResponse({'category': 'added'})


''' Done '''
# Get/disaplay categories


@api_view(['GET'])
# admin/user
def get_category(request, id=0):
    if int(id) > 0:  # get one category
        category = Category.objects.filter(_id=id)
    else:
        category = Category.objects.all()  # get all categories
    serializer = categorySerializer.CategorySerializer(category, many=True)
    return Response(serializer.data)


# update category
@api_view(['PUT'])
@permission_classes([IsAdminUser])  # only for admin
def updateCat(request, id):
    tempCat = Category.objects.get(_id=id)
    tempCat.name = request.data['name']
    tempCat.save()
    return Response('category updated')


# delete category
@api_view(['DELETE'])
@permission_classes([IsAdminUser])  # only for admin
def deletecat(request, id):
    tempCat = Category.objects.get(_id=id)
    tempCat.delete()
    return Response('category deleted')
