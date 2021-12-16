from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import AuthorManager

class Author(AbstractBaseUser, PermissionsMixin):
	email = models.EmailField(max_length=60, unique=True)
	username = models.CharField(max_length=30, unique=True)
	date_joined = models.DateTimeField(auto_now_add=True)
	last_login = models.DateTimeField(auto_now=True)
	is_admin = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	first_name = models.CharField(max_length=30)
	last_name = models.CharField(max_length=30)
	profile_image = models.ImageField(blank=True, null=True, upload_to="profile_images")
	about = models.TextField(blank=True)
	total_posts = models.IntegerField(default=0)
	total_post_likes = models.IntegerField(default=0)

	USERNAME_FIELD = "email"
	REQUIRED_FIELDS = ["username", "first_name", "last_name"]

	objects = AuthorManager()

	def __str__(self):
		return self.username


class Post(models.Model):
	date_created = models.DateTimeField(default=timezone.now)
	last_modified = models.DateTimeField(auto_now=True)
	author = models.ForeignKey(
		to=Author,
		related_name="posts",
		on_delete=models.CASCADE,
		blank=False,
		null=False
	)
	title = models.CharField(max_length=150, blank=False, null=False)
	text = models.TextField(blank=False, null=False)
	total_comments = models.IntegerField(default=0)
	total_likes = models.IntegerField(default=0)

	def __str__(self):
		return self.title


class Comment(models.Model):
	date_created = models.DateTimeField(default=timezone.now)
	author = models.ForeignKey(
		to=Author,
		related_name="comments",
		on_delete=models.CASCADE,
		blank=False,
		null=False
	)
	post = models.ForeignKey(
		to=Post,
		related_name="comments",
		on_delete=models.CASCADE,
		blank=False,
		null=False
	)
	text = models.TextField()

class PostLike(models.Model):
	date_created = models.DateTimeField(default=timezone.now)
	author = models.ForeignKey(
		to=Author,
		related_name="post_likes",
		on_delete=models.CASCADE,
		blank=False,
		null=False
	)
	post = models.ForeignKey(
		to=Post,
		related_name="post_likes",
		on_delete=models.CASCADE,
		blank=False,
		null=False
	)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def createAuthToken(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)
