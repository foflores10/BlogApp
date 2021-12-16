import React, {useState, useEffect} from "react"
import PostCard from "../../components/PostCard"
import { useAuth } from "../../contexts/AuthContext"
import {useFetch} from "../../contexts/FetchContext"

export default function PostCardContainer({post}) {
	let isAuth = useAuth()
	let fetchData = useFetch()
	let [likeRes, setLikeRes] = useState()
	let [postState, setPostState] = useState(post)

	useEffect(() => {
		setPostState(post)
	}, [post, setPostState])

	let date = new Date(postState.date_created)
	postState.date_created = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

	// POST/DELETE like from post
	function handleClick() {
		if (!isAuth) return
		let request = {
			endpoint: `/api/posts/${postState.id}/like/`,
			method: postState.liked_by_user ? "DELETE" : "POST"
		}
		fetchData(request, setLikeRes)
		setPostState(prevState => {
			return {
				...prevState,
				total_likes: prevState.liked_by_user ? prevState.total_likes - 1 : prevState.total_likes + 1
			}
		})
	}

	// Check POST/DELETE response
	useEffect(() => {
		if (!likeRes) return
		if (likeRes.data) {
			setPostState(prevState => {
				return {
					...prevState,
					liked_by_user: !prevState.liked_by_user
				}
			})
		} else if (likeRes.badRequest) {
			console.log(likeRes.badRequest)
		} else {
			console.log(likeRes.error)
		}
	}, [likeRes, setPostState])

	let props = {postState, handleClick}

	return (
		<PostCard props={props} />
	)
}
