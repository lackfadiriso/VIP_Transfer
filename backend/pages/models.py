from django.db import models
from constants import CURRENCY_CHOICES


class AboutUs(models.Model):
    about_text = models.TextField('Hakkimizda Metni', default='')
    years_experience = models.IntegerField(
        'Kac Yil Deneyiminiz Var', default=5
    )
    happy_customer = models.CharField(
        'Memnun Musteri Sayisi',
        default='20K+',
        max_length=20
    )

    class Meta:
        verbose_name = 'Hakkimizda Sayfasi'
        verbose_name_plural = 'Hakkimizda Sayfasi'


class Prices(models.Model):
    from_location = models.CharField('Nerden', max_length=60, default='')
    to_location = models.CharField('Nereye', max_length=60, default='')
    price = models.DecimalField(
        'Fiyat',
        max_digits=10,
        decimal_places=2,
        default=0
    )
    currency = models.CharField('Döviz', choices=CURRENCY_CHOICES, default='€')

    class Meta:
        verbose_name = 'Fiyatlar'
        verbose_name_plural = 'Fiyatlar'

    def __str__(self):
        return (
            f'{self.from_location} --> '
            f'{self.to_location}: '
            f'{self.price} {self.currency}'
        )


class Vehicle(models.Model):
    image = models.ImageField('Araç Resmi', upload_to='vehicle/')
    name = models.CharField('Araç Ismi', max_length=40)
    capacity = models.IntegerField('Araç Kapasitesi', default=4)

    class Meta:
        verbose_name = 'Araçlarim'
        verbose_name_plural = 'Araçlarim'

    def __str__(self):
        return self.name
