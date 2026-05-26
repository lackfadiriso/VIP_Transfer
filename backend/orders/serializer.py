from datetime import date
from rest_framework import serializers

from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'full_name',
            'phone',
            'pick_up_location',
            'drop_off_location',
            'pick_up_date',
            'passenger_count',
            'return_date'
        ]

    passenger_count = serializers.IntegerField(min_value=1)

    def validate(self, data):
        if data.get('phone'):
            data['phone'] = data['phone'].strip()
        return data

    def validate_phone(self, value):
        if Order.objects.filter(phone=value.strip()).exists():
            raise serializers.ValidationError('existing_reservation')
        return value.strip()

    def validate_pick_up_date(self, value):
        if value.date() < date.today():
            raise serializers.ValidationError('Geçmiş tarih seçilemez.')
        return value


class MyOrdersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'
