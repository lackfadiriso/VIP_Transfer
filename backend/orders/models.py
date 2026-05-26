from django.db import models


class Order(models.Model):
    full_name = models.CharField('İsim Soyisim', max_length=100)
    phone = models.CharField('Telefon Numarası', max_length=20, unique=True)
    pick_up_location = models.CharField('Nereden', max_length=240)
    drop_off_location = models.CharField('Nereye', max_length=240)
    pick_up_date = models.DateTimeField('Tarih ve saat')
    return_date = models.DateTimeField(
        'Donuş tarih ve saati',
        blank=True,
        null=True
    )
    passenger_count = models.IntegerField('Yolcu Sayısı', default=1)
    created_at = models.DateTimeField(
        'Siparişin Oluşturulduğu Tarih',
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'Sipariş'
        verbose_name_plural = 'Siparişler'

    def __str__(self):
        return f'{self.full_name}, Oluşturulma tarihi:{self.created_at}'


class NotificationEmails(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'Çalışan E-postası'
        verbose_name_plural = 'Çalışanların E-postaları'

    def __str__(self):
        return self.email
