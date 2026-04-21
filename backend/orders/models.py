from django.db import models

from .constants import STATUS_CHOICE


class Order(models.Model):
    full_name = models.CharField(max_length=40)
    phone = models.CharField(max_length=20)
    pick_up_location = models.CharField(max_length=240)
    drop_off_location = models.CharField(max_length=240)
    pick_up_date = models.DateTimeField()
    passenger_count = models.IntegerField()
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICE,
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=('full_name', 'phone'),
                name='unique_fullname_phone',
                violation_error_message='Bu isim ve telefon zaten kayıtlıdır.'
            )
        ]
