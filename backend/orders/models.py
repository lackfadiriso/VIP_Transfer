from django.db import models

from .constants import STATUS_CHOICE


class Order(models.Model):
    full_name = models.CharField('İsim Soyisim', max_length=40)
    phone = models.CharField('Telefon Numarası', max_length=20)
    pick_up_location = models.CharField('Nereden', max_length=240)
    drop_off_location = models.CharField('Nereye', max_length=240)
    pick_up_date = models.DateTimeField('Tarih ve saat')
    passenger_count = models.IntegerField('Yolcu Sayısı', default=1)
    status = models.CharField(
        'Sipariş Durumu',
        max_length=10,
        choices=STATUS_CHOICE,
        default='pending'
    )
    created_at = models.DateTimeField(
        'Siparişin Oluşturulduğu Tarih',
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'Sipariş'
        verbose_name_plural = 'Siparişler'
        constraints = [
            models.UniqueConstraint(
                fields=('full_name', 'phone'),
                name='unique_fullname_phone',
                violation_error_message='Bu isim ve telefon zaten kayıtlıdır.'
            )
        ]

    def __str__(self):
        return f'{self.full_name}, Oluşturulma tarihi:{self.created_at}'
