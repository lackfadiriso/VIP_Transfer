from django.core.management.base import BaseCommand
from django.utils import timezone

from orders.models import Order


class Command(BaseCommand):
    def handle(self, *args, **options):
        Order.objects.filter(pick_up_date__lt=timezone.now()).delete()
