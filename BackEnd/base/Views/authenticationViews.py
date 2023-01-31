# checkout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import HttpResponse, JsonResponse
from ..models import Profile, Category, Order, Product, OrderDetail
from rest_framework.response import Response
from ..serializers import categorySerializer, productSerializer, orderSerializer, userSerializer
from django.contrib.auth import logout
from django.contrib.auth.hashers import make_password


''' Done '''
# token-


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        profile = Profile.objects.get(user_id=user.id)
        # Add custom claims
        token['id'] = user.id
        token['username'] = user.username
        token['email'] = user.email
        token['staff'] = user.is_staff
        token['superuser'] = user.is_superuser
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        token['phone'] = profile.phone
        token['adress'] = profile.address
        token['gender'] = profile.gender

        # send params into the token
        # should export it in the Loginslicer
        return token


''' Done '''
# log in


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class TokenRefreshView(TokenRefreshView):
    serializer_class = TokenRefreshSerializer


''' Done '''
# admin/user register


@api_view(['POST'])
def register(request):
    isStaff = request.data["is_staff"]
    user = User.objects.create_user(
        email=request.data["email"],
        password=request.data["password"],
        is_staff=isStaff,
        username=request.data["username"],
        first_name=request.data['first_name'],
        last_name=request.data['last_name'])
    Profile.objects.create(user=user, phone=str(request.data['phone']),
                           address=request.data['address'], gender=request.data['gender'])
    return HttpResponse('register')


# Logout
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logOut(request):
    logout(request)
    return Response("logged out")


# get user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request, id=0):
    if int(id) > 0:  # get one user
        user = User.objects.filter(id=id)
    else:
       # get all users
        user = User.objects.all()
    serializer = userSerializer.UserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getProfile(request, id=0):
    user = User.objects.filter(id=id)
    if int(id) > 0:  # get one user
        profile = Profile.objects.filter(user_id=user)
    else:
        profile = Profile.objects.all()
    serializer = userSerializer.ProfileSerializer(profile, many=True)
    return Response(serializer.data)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getOneUser(request, id):
    completeUser = []
    tempUser = {}
    user = User.objects.filter(id=id)
    profile = Profile.objects.filter(user_id=id)
    for oneUser in user:
        for oneProfile in profile:
            tempUser["id"] = oneUser.id
            tempUser["username"] = oneUser.username
            tempUser["first_name"] = oneUser.first_name
            tempUser["last_name"] = oneUser.last_name
            tempUser["email"] = oneUser.email
            tempUser["adress"] = oneProfile.address
            tempUser["phone"] = oneProfile.phone
            tempUser["gender"] = oneProfile.gender
    completeUser.append(tempUser)

    return Response(completeUser)



''' Done '''
# update user


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateUser(request, id=0):
    tempUser = User.objects.get(id=id)
    tempProfile = Profile.objects.get(user_id=tempUser.id)
    if "username" in request.data:
        tempUser.username = request.data['username']
    if "first_name" in request.data:
        tempUser.first_name = request.data['first_name']
    if "is_staff" in request.data:
        tempUser.is_staff = request.data['is_staff']
    if "last_name" in request.data:
        tempUser.last_name = request.data['last_name']
    if "password" in request.data:
        # change the password with token instead of string
        if request.data['password'] != "":
            tempUser.password = make_password(request.data['password'])
    if "email" in request.data:
        tempUser.email = request.data['email']
    if "address" in request.data:
        tempProfile.address = request.data['address']
    if "phone" in request.data:
        tempProfile.phone = str(request.data['phone'])
    if "gender" in request.data:
        tempProfile.gender = request.data['gender']
    tempUser.save()
    tempProfile.save()
    return Response("user updated")


''' Done '''
# delete user


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, id):
    delUser = User.objects.get(id=id)
    delUser.delete()
    return Response("user deleted")
