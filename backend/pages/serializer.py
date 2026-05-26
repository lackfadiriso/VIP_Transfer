from rest_framework.serializers import ModelSerializer, ImageField

from .models import AboutUs, Prices, Vehicle


class AboutSerializer(ModelSerializer):

    class Meta:
        model = AboutUs
        fields = '__all__'


class PricesSerializer(ModelSerializer):

    class Meta:
        model = Prices
        fields = '__all__'


class VehicleSerializer(ModelSerializer):
    image = ImageField(use_url=True)

    class Meta:
        model = Vehicle
        fields = '__all__'
