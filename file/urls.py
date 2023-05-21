from django.urls import path, include
from rest_framework import routers
from file.views import UploadViewSet, CompareViewSet
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'upload', UploadViewSet, basename="upload")
router.register(r'compare', CompareViewSet, basename="compare")

urlpatterns = [
    path('', include(router.urls)),
]
