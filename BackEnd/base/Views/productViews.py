from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import HttpResponse, JsonResponse
from ..models import Profile, Category, Order, Product, OrderDetail
from rest_framework.response import Response
from ..serializers import categorySerializer, productSerializer, orderSerializer
from decimal import Decimal


''' Done '''
# add product


@api_view(['POST'])
@permission_classes([IsAdminUser])  # only for admin
def add_product(request):
    photo = request.FILES['photo']
    Product.objects.create(
        description=request.POST['description'],
        photo=photo,
        price=str(request.POST['price']),
        user=request.user,
        category=Category.objects.get(_id=request.data['category'])
    )
    return HttpResponse('regiser')


''' Done '''
# dispaly products


@api_view(['GET'])
def get_products(request, product_id=0, category_id=0):
    if int(category_id) > 0:
        # if int(product_id) > 0:
        # category = Category.objects.get(_id=category_id)
        product = Product.objects.filter(category_id=int(category_id))
        # else:
            # category = Category.objects.get(_id=category_id)
            # product = Product.objects.filter(category=category)
    else:
        product = Product.objects.all()
    serializer = productSerializer.ProductSerializer(product, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProductsPerCategoty(request, cat_id=0):
    if int(cat_id) > 0:  # return prods per category -READ
        prod = Product.objects.filter(category_id=int(cat_id))
    else:  # get All prods -READ
        prod = Product.objects.all()
    serializer = productSerializer.ProductSerializer(prod, many=True)      
    return Response(serializer.data)
 
    


@api_view(['GET'])
def get_one_products(request, product_id=0, ):
    product = Product.objects.filter(_id=product_id)
    serializer = productSerializer.ProductSerializer(product, many=True)
    return Response(serializer.data)



# update product

@api_view(['PATCH'])
@permission_classes([IsAdminUser])  # only for admin
def update_prod(request, id):
    tempProd = Product.objects.get(_id=id)
    if "description" in request.data:
        tempProd.description = request.data['description']
    if "price" in request.data:
        tempProd.price = str(request.data['price'])
    # tempProd.user = request.user,
    # if request.data['photo']:
    #     tempProd.photo = request.data['photo'],
    # tempProd.category = Category.objects.get(_id=request.data['category'])
    tempProd.save()
    return Response('Product updated')

# delete product


@api_view(["DELETE"])
@permission_classes([IsAdminUser])  # only for admin
def delete_prod(request, id):
    tempProd = Product.objects.get(_id=id)
    tempProd.delete()
    return Response('Product deleted')
