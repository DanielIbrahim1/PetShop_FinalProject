
from django.contrib import admin
from django.urls import path
from .Views import categoryViews, productViews, orderViews, authenticationViews

urlpatterns = [

    # user URLS
    path('login/', authenticationViews.MyTokenObtainPairView.as_view(),
         name='login'),  # works
    path('login/refresh/', authenticationViews.TokenRefreshView.as_view(),
         name='token_refresh'),

    path('getuser/', authenticationViews.getUsers, name='getuser'),
    path('getuser/<id>/', authenticationViews.getUsers, name='getuser'),

    path('getprofile/', authenticationViews.getProfile, name='getprofile'),
    path('getprofile/<id>/', authenticationViews.getProfile, name='getprofile'),

    path('getoneuser/<id>/', authenticationViews.getOneUser, name='getoneuser'),


    path('logout/', authenticationViews.logOut, name='logout'),  # works

    path('register/', authenticationViews.register, name="register"),  # works

    path('updateuser/', authenticationViews.updateUser,
         name="updateuser"),
    path('updateuser/<id>', authenticationViews.updateUser,
         name="updateuser"),  # works

    path('deleteuser/<id>', authenticationViews.deleteUser,
         name="deleteuser"),  # works



    # Category URLS
    path('addcategory/', categoryViews.add_category, name="addcategory"),  # works

    path('getcategory/', categoryViews.get_category, name="getcategory"),  # works

    path('getcategory/<id>', categoryViews.get_category,
         name="getcategory"),  # works

    path('updatedcategory/<id>', categoryViews.updateCat,
         name="updatedcategory"),  # works

    path('deletecategory/<id>', categoryViews.deletecat,
         name="deletecategory"),  # works



    # Products URLS
    path('addproduct/', productViews.add_product, name="addproduct"),  # works

    path('getproduct/', productViews.get_products, name="getproduct"),  # works

    path('getproduct/<category_id>/',
         productViews.get_products, name="getproduct"),  # works
     
     # path('getproductper/',
     #     productViews.getProductsPerCategoty, name="getproductpercategory"),
     path('getproductper/<cat_id>',
         productViews.getProductsPerCategoty, name="getproductpercategory"),
    
    path('getproduct/<product_id>',
         productViews.get_one_products, name="getproduct"),  # works

    path('updateproduct/<id>', productViews.update_prod,
         name="updateproduct"),  # works

    path('delteproduct/<id>', productViews.delete_prod,
         name="delteproduct"),  # works

    #



    # Checkout URLS

    path('checkout/', orderViews.addToOrders, name="checkout"),

    path('allorders/', orderViews.allOrders, name="allorders"),

    path('getorderdetails/<id>', orderViews.getOrderDetails, name="getorderdetails"),

]
