from django.contrib import admin

from .models import AboutUs, Prices, Vehicle

admin.site.register([Prices, Vehicle])


@admin.register(AboutUs)
class AboutUsAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': (
                ('about_text_tr', 'about_text_en'),
                ('about_text_ru', 'about_text'),
                ('years_experience', 'happy_customer'),
            )
        }),
    )
