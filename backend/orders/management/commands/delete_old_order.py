from django.core.management.base import BaseCommand
from django.utils import timezone

from orders.models import Order


class Command(BaseCommand):
    def handle(self, *args, **options):
        Order.objects.filter(
            return_date__isnull=True,
            pick_up_date__lt=timezone.now()
        ).delete()

        Order.objects.filter(
            return_date__isnull=False,
            return_date__lt=timezone.now()
        ).delete()
