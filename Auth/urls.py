from django.urls import path
from . import views

urlpatterns = [
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('user/register/', views.UserRegistrationView.as_view(), name='user-registration'),
    path('user/', views.UserDetailView.as_view(), name='user-detail'),
]
