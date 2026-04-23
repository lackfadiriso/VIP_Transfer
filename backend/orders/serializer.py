from datetime import date
from rest_framework import serializers

from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    passenger_count = serializers.IntegerField(min_value=1)

    class Meta:
        model = Order
        fields = [
            'full_name',
            'phone',
            'pick_up_location',
            'drop_off_location',
            'pick_up_date',
            'passenger_count',
        ]

    def validate_pick_up_date(self, value):
        if value.date() < date.today():
            raise serializers.ValidationError('Geçmiş tarih seçilemez.')
        return value


class MyOrdersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'
