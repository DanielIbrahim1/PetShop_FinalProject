from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, blank=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Product(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, blank=False)
    description = models.CharField(max_length=50, null=False, blank=False)
    photo = models.ImageField(null=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, null=False, blank=False)
    price = models.DecimalField(max_digits=100, decimal_places=2, default=1)

    def __str__(self):
        return self.description


class Profile(models.Model):

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name='userExtended')
    address = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    phone = models.IntegerField()

    def __str__(self):
        return self.address


class Order(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, blank=False)
    order_total_price = models.DecimalField(
        max_digits=100, decimal_places=2, default=1)
    createdTime = models.DateTimeField(auto_now_add=True)
    date=models.DateField(auto_now_add=True, )

    def __str__(self):
        return str(self.createdTime)



class OrderDetail(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    order_id = models.ForeignKey(
        Order, on_delete=models.CASCADE, null=False, blank=False,)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=False, blank=False)
    amount = models.IntegerField(default=1, null=True, blank=True)
    total_price = models.DecimalField(
        max_digits=100, decimal_places=2, default=1)
    photo=models.ImageField(null=True, blank=True,)
    order_total_price = models.DecimalField(
        max_digits=100, decimal_places=2, default=1)
    def __str__(self):
        return str(self.order_id)

#
# pass
