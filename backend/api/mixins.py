from rest_framework.permissions import IsAdminUser, AllowAny


class AdminOrReadOnlyMixin:
    def get_permissions(self):
        if self.action in ['destroy', 'update', 'partial_update']:
            return [IsAdminUser()]
        return [AllowAny()]
