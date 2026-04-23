import os

from dotenv import load_dotenv
from django.core.mail import EmailMultiAlternatives
from django_filters.rest_framework import DjangoFilterBackend
from django.template.loader import render_to_string
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import AllowAny, IsAdminUser

from .filters import FilterOrder
from .models import NotificationEmails, Order
from .serializer import OrderSerializer, MyOrdersSerializer

load_dotenv()


def send_mail_owner(order):
    emails = tuple(NotificationEmails.objects.values_list('email', flat=True))
    if emails:
        html_content = render_to_string('email_owner.html', {
            'full_name': order.full_name,
            'phone': order.phone,
            'pick_up_location': order.pick_up_location,
            'drop_off_location': order.drop_off_location,
            'passenger_count': order.passenger_count,
            'pick_up_date': order.pick_up_date
        })
        msg = EmailMultiAlternatives(
            subject='Yeni Sipariş',
            body='Yeni sipariş alındı.',
            from_email=os.getenv('EMAIL_HOST_USER'),
            to=emails
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action in ['list', 'destroy', 'update', 'partial_update']:
            return [IsAdminUser()]
        return [AllowAny()]

    def perform_create(self, serializer):
        order = serializer.save()
        send_mail_owner(order)


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
