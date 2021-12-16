from typing_extensions import Required
from django.contrib.auth.models import AnonymousUser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from api.permissions import IsAuthorOwnerOrReadOnly, IsPostOwnerOrReadOnly
from database.models import Author, Post, PostLike, Comment
from database.serializers import AuthorSerializer, PostSerializer, CommentSerializer
from database.serializers import PostWithAuthorAndCommentsSerializer, AuthorWithPostsSerializer, AuthorWithPasswordSerializer
from rest_framework import status

class AuthorViewSet(ModelViewSet):
	permission_classes = [IsAuthorOwnerOrReadOnly]
	lookup_field = "username"

	def get_queryset(self):
		queryset = Author.objects.all()
		if self.request.query_params and self.request.path == "/api/authors/":
			authorId = self.request.query_params.get("id")
			email = self.request.query_params.get("email")
			username = self.request.query_params.get("username")
			order_by = self.request.query_params.get("order_by")
			limit = self.request.query_params.get("limit")
			if authorId:
				queryset = queryset.filter(id=authorId)
			if email:
				queryset = queryset.filter(email=email)
			if username:
				queryset = queryset.filter(username=username)
			if order_by:
				queryset = queryset.order_by(order_by)
			if limit:
				queryset = queryset[:int(limit)]
		return queryset

	def get_serializer_class(self):
		serializer = AuthorSerializer
		if self.request.query_params:
			depth = self.request.query_params.get("depth")
			if depth == "1":
				serializer = AuthorWithPostsSerializer
		elif self.request.method == "POST" and self.request.path == "/api/authors/":
			serializer = AuthorWithPasswordSerializer
		return serializer


class PostViewSet(ModelViewSet):
	permission_classes = [IsPostOwnerOrReadOnly]

	def get_queryset(self):
		queryset = Post.objects.all()
		if self.request.query_params and self.request.path == "/api/posts/":
			postId = self.request.query_params.get("id")
			title = self.request.query_params.get("title")
			author = self.request.query_params.get("author")
			order_by = self.request.query_params.get("order_by")
			limit = self.request.query_params.get("limit")
			if postId:
				queryset = queryset.filter(id=postId)
			if title:
				queryset = queryset.filter(title=title)
			if author:
				queryset = queryset.filter(author__username=author)
			if order_by:
				queryset = queryset.order_by(order_by)
			if limit:
				queryset = queryset[:int(limit)]
		return queryset

	def list(self, request):
		queryset = self.get_queryset()
		serializer = PostWithAuthorAndCommentsSerializer(queryset, many=True)
		serializedData = serializer.data
		if request.user.is_authenticated:
			for post in serializedData:
				liked = PostLike.objects.filter(post__id=post["id"], author=request.user)
				if len(liked) > 0:
					post["liked_by_user"] = True
				else:
					post["liked_by_user"] = False
		return Response(serializedData)

	def retrieve(self, request, pk=None):
		queryset = self.get_queryset()
		try:
			post = queryset.get(pk=pk)
		except:
			return Response({}, status=status.HTTP_404_NOT_FOUND)

		serializer = PostWithAuthorAndCommentsSerializer(post)
		serializedData = serializer.data
		if request.user.is_authenticated:
			liked = PostLike.objects.filter(post__id=post.id, author=request.user)
			if len(liked) > 0:
				serializedData["liked_by_user"] = True
			else:
				serializedData["liked_by_user"] = False
		return Response(serializedData)

	def get_serializer_class(self):
		serializer = PostSerializer
		if self.request.query_params:
			depth = self.request.query_params.get("depth")
			if depth == "1":
				serializer = PostWithAuthorAndCommentsSerializer
		return serializer

	def create(self, request):
			data = dict(request.data)
			if not data["title"] or not data["text"]:
				return Response({"detail": "Missing fields. 'title' and 'text' are required."})

			post = Post(title=data["title"], text=data["text"], author=request.user)
			post.save()
			serializer = PostSerializer(post)
			return Response(serializer.data)

	@action(detail=True, methods=["POST", "GET"], permission_classes=[IsAuthenticatedOrReadOnly])
	def comments(self, request, pk=None):
		post = self.get_object()
		print(request.data)

		if request.method == "GET":
			comments = post.comments.all().order_by("-date_created")
			serializer = CommentSerializer(comments, many=True)
			return Response(serializer.data)

		if request.method == "POST":
			if not "text" in request.data:
				return Response({"text": "this field is required"}, status=status.HTTP_400_BAD_REQUEST)
			comment = Comment(author=request.user, post=post, text=request.data["text"])
			comment.save()
			comment.post.total_comments += 1
			comment.post.save()
			return Response({}, status=status.HTTP_201_CREATED)

	@action(detail=True, methods=["POST", "DELETE"], permission_classes=[IsAuthenticatedOrReadOnly])
	def like(self, request, pk=None):
		post = self.get_object()
		query = PostLike.objects.filter(author=request.user, post=post)

		if request.method == "POST" and not query:
			PostLike(author=request.user, post=post).save()
			post.author.total_post_likes += 1
			post.author.save()
			post.total_likes += 1
			post.save()
			return Response({})

		elif request.method == "DELETE" and query:
			query[0].delete()
			post.author.total_post_likes -= 1
			post.author.save()
			post.total_likes -= 1
			post.save()
			return Response({})

		return Response({"detail": "Post is already liked/unliked"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def Search(request):
	if request.method == "GET":
		query = request.query_params["query"]
		order_by = request.query_params["order_by"]

		titleSearch = Post.objects.filter(title__icontains=query)
		textSearch = Post.objects.filter(text__icontains=query)
		authorSearch = Post.objects.filter(author__username__icontains=query)

		posts = titleSearch | textSearch | authorSearch
		posts = posts.order_by(order_by)

		serializer = PostWithAuthorAndCommentsSerializer(posts, many=True)
		return Response(serializer.data)

@api_view(["POST"])
def ProfileImage(request):
	if request.method == "POST":
		image = request.data["file"]
		author = request.user
		author.profile_image = image
		author.save()
		print(author.profile_image)
		return Response({})
