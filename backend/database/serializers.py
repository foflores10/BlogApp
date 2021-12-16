from database.models import Author, Post, Comment, PostLike
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Post
		fields = "__all__"
		read_only_fields = ["id", "date_created", "last_modified", "total_comments", "total_likes", "author"]

class AuthorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Author
		exclude = ["password", "is_staff", "is_admin", "is_superuser", "groups", "user_permissions"]
		read_only_fields = ["total_posts", "total_post_likes", "id", "date_joined", "last_login", "is_active", "profile_image"]

class CommentSerializer(serializers.ModelSerializer):
	author = AuthorSerializer(read_only=True)
	class Meta:
		model = Comment
		fields = "__all__"
		read_only_fields = ["id", "date_created"]

class PostLikeSerializer(serializers.ModelSerializer):
	class Meta:
		model = PostLike
		fields = "__all__"
		read_only_fields = ["id", "date_created", "author", "post"]

class AuthorWithPasswordSerializer(serializers.ModelSerializer):
	class Meta:
		model = Author
		exclude = ["is_staff", "is_admin", "is_superuser", "groups", "user_permissions"]
		read_only_fields = ["total_posts", "total_post_likes", "id", "date_joined", "last_login", "is_active"]

	def create(self, validated_data):
		author = Author(**validated_data)
		author.password = make_password(validated_data["password"])
		author.save()
		return author

class AuthorWithPostsSerializer(AuthorSerializer):
	posts = PostSerializer(many=True, read_only=True)

class PostWithAuthorAndCommentsSerializer(serializers.ModelSerializer):
	author = AuthorSerializer
	comments = CommentSerializer(many=True, read_only=True)
	class Meta:
		model = Post
		fields = "__all__"
		depth = 1
