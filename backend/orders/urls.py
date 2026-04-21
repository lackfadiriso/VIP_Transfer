from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import OrderViewSet, MyOrderViewSet

router_v1 = DefaultRouter()
router_v1.register(r'orders', OrderViewSet, basename='orders')
router_v1.register(r'my-orders', MyOrderViewSet, basename='my-orders')

urlpatterns = [
    path('', include(router_v1.urls))
]
