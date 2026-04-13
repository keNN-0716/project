from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('secret/', views.secret, name='secret'),
]
