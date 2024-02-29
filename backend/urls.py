
from django.contrib import admin
from django.urls import path,include
from drf_spectacular.views import SpectacularAPIView,SpectacularSwaggerView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from ..main import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/',include('main.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/register/', views.UserRegistrationView.as_view(), name='user-registration'),
]
