from rest_framework.viewsets import ModelViewSet

from api.mixins import AdminOrReadOnlyMixin
from .models import AboutUs, Prices, Vehicle
from .serializer import AboutSerializer, PricesSerializer, VehicleSerializer


class AboutViewSet(ModelViewSet, AdminOrReadOnlyMixin):
    queryset = AboutUs.objects.all()
    serializer_class = AboutSerializer


class PricesViewSet(ModelViewSet, AdminOrReadOnlyMixin):
    queryset = Prices.objects.all()
    serializer_class = PricesSerializer


class VehicleViewSet(ModelViewSet, AdminOrReadOnlyMixin):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
