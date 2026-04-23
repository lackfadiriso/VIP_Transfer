from django.contrib import admin

from .models import NotificationEmails, Order

admin.site.register(NotificationEmails)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'full_name',
        'pick_up_location',
        'drop_off_location',
        'pick_up_date',
        'created_at',
    )
    ordering = ('created_at',)
