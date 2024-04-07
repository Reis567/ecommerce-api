
from django.contrib import admin
from django.urls import path,include
from drf_spectacular.views import SpectacularAPIView,SpectacularSwaggerView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from main import views as mainViews



urlpatterns = [
    path('',mainViews.welcome,name='welcome'),
    path('admin/', admin.site.urls),
    path('api/v1/',include('main.urls')),
    path('api/auth/',include('Auth.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'),
]
