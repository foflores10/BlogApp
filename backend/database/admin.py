from django.contrib import admin
from database.models import Author, Post, Comment, PostLike
from django.contrib.auth.models import Group
from rest_framework.authtoken.models import TokenProxy
from django.contrib.auth.admin import UserAdmin

class AuthorAdmin(UserAdmin):
	model = Author
	search_fields = ["username", "email", "first_name", "last_name"]
	ordering = ["username"]
	list_display = ["username", "email", "first_name", "last_name"]
	list_filter= ["is_superuser"]
	readonly_fields = ["date_joined", "last_login"]

	fieldsets = [[
			"Account Information",
			{"fields":["email", "username", "password", "profile_image", "total_posts", "total_post_likes", "date_joined", "last_login"]}
		],[
			"Personal Information",
			{"fields":["first_name", "last_name", "about"]}
		],[
			"Permissions",
			{"fields":["is_staff", "is_active"]}
		],]

	add_fieldsets = [
		[None,
		{
			"classes": ["wide"],
			"fields": ["email", "username", "first_name", "last_name", "password1", "password2"]}]
	]

admin.site.register(Author, AuthorAdmin)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(PostLike)
admin.site.unregister(Group)
