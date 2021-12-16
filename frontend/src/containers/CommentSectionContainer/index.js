import React, {useEffect, useState} from "react"
import CommentSection from "../../components/CommentSection"
import {useFetch} from "../../contexts/FetchContext"
import {useParams} from "react-router-dom"

export default function CommentSectionContainer() {
	let params = useParams()
	let fetchData = useFetch()

	let [postRes, setPostRes] = useState()
	let [commentRes, setCommentRes] = useState()
	let [commentData, setCommentData] = useState()
	let [newComment, setNewComment] = useState("")


	// GET post data from api
	useEffect(() => {
		let request = {
			endpoint: `/api/posts/${params.postId}/`,
			method: "GET",
			query: {
				depth: 1
			}
		}
		fetchData(request, setPostRes)
	}, [params.postId, setPostRes, fetchData, commentRes])

	// Check GET response and log errors
	useEffect(() => {
		if (!postRes) return
		if (postRes.data) {
			let data = postRes.data.comments.map(comment => {
				let date = new Date(comment.date_created)
				comment.date_created = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
				return comment
			})
			setCommentData(data.reverse())
		}
	}, [postRes])

	// Update controlled inputs
	function handleChange(event) {
		setNewComment(event.target.value)
	}

	// POST new comment to api
	function handleSubmit(event) {
		event.preventDefault()
		let request = {
			endpoint: `/api/posts/${params.postId}/comments/`,
			method: "POST",
			body: JSON.stringify({text: newComment})
		}
		fetchData(request, setCommentRes)
	}

	// Check POST response and log errors
	useEffect(() => {
		if (!commentRes) return
		if (commentRes.data) {
			setCommentRes()
			setNewComment("")
		} else if (commentRes.badRequest) {
			console.log(commentRes.badRequest)
		} else {
			console.log(commentRes.error)
		}
	}, [commentRes, setCommentRes, setNewComment])

	let props = {
		commentData,
		handleChange,
		handleSubmit,
		newComment
	}

	return (
		<CommentSection props={props}/>
	)
}
