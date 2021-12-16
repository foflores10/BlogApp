import React, {useEffect, useState} from "react"
import Post from "../../components/Post"
import {useParams} from "react-router-dom"
import {useFetch} from "../../contexts/FetchContext"
import {useSetCurrentPost} from "../../contexts/CurrentPostContext"

export default function PostContainer() {
	let params = useParams()
	let fetchData = useFetch()
	let setCurrentPost = useSetCurrentPost()

	let [post, setPost] = useState()
	let [postRes, setPostRes] = useState()
	let [likeRes, setLikeRes] = useState()

	// GET post from api
	useEffect(() => {
		let request = {
			endpoint: `/api/posts/${params.postId}/`,
			method: "GET",
			query: {
				depth: 1
			}
		}
		fetchData(request, setPostRes)
	}, [fetchData, params.postId])

	// Check response from api
	useEffect(() => {
		if (!postRes) return
		if (postRes.data) {
			console.log(postRes.data)
			if (postRes.data.author.username === localStorage.getItem("username")) {
				setCurrentPost({
					isOwner: true,
					postId: postRes.data.id
				})
			}
			setPost(postRes.data)
		}
	}, [postRes, setPost, setCurrentPost])

	// Handle post likes/unlikes
	function handleClick() {
		let request = {
			endpoint: `/api/posts/${post.id}/like/`,
			method: post.liked_by_user ? "DELETE" : "POST"
		}
		fetchData(request, setLikeRes)
		setPost(prevState => {
			return {
				...prevState,
				total_likes: prevState.liked_by_user ? prevState.total_likes - 1 : prevState.total_likes + 1
			}
		})
	}

	// Check post like/unlike response
	useEffect(() => {
		if (!likeRes) return
		if (likeRes.data) {
			setPost(prevState => {
				return {
					...prevState,
					liked_by_user: !prevState.liked_by_user
				}
			})
		}
	}, [likeRes])

	let props = {post, handleClick}

	return (
		<Post props={props}/>
	)
}
