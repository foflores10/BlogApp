from django.urls import path
from rest_framework.authtoken import views
from api.views import AuthorViewSet, PostViewSet, Search, ProfileImage
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register("authors", AuthorViewSet, basename='author')
router.register("posts", PostViewSet, basename="post")

urlpatterns = [
	path("login/", views.obtain_auth_token),
	path("search/", Search),
	path("profile-image/", ProfileImage)
] + router.urls
