import django_filters

from .models import Order


class FilterOrder(django_filters.FilterSet):
    full_name = django_filters.CharFilter(lookup_expr='icontains')
    phone = django_filters.CharFilter(lookup_expr='iexact')

    class Meta:
        model = Order
        fields = ['full_name', 'phone']
