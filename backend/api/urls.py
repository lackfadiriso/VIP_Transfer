from django.urls import path, include
from rest_framework.routers import DefaultRouter

from orders.views import OrderViewSet, MyOrderViewSet
from pages.views import AboutViewSet, PricesViewSet, VehicleViewSet

router_v1 = DefaultRouter()
router_v1.register(r'orders', OrderViewSet, basename='orders')
router_v1.register(r'my-orders', MyOrderViewSet, basename='my-orders')
router_v1.register(r'about', AboutViewSet, basename='about')
router_v1.register(r'prices', PricesViewSet, basename='prices')
router_v1.register(r'vehicles', VehicleViewSet, basename='vehicles')

urlpatterns = [
    path('', include(router_v1.urls))
]
