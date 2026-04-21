from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import AllowAny, IsAdminUser

from .filters import FilterOrder
from .models import Order
from .serializer import OrderSerializer, MyOrdersSerializer


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action in ['list', 'destroy', 'update', 'partial_update']:
            return [IsAdminUser()]
        return [AllowAny()]


class MyOrderViewSet(ReadOnlyModelViewSet):
    serializer_class = MyOrdersSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = FilterOrder

    def get_queryset(self):
        phone = self.request.query_params.get('phone')
        name = self.request.query_params.get('full_name')

        if not phone or not name:
            return Order.objects.none()

        return Order.objects.all()
