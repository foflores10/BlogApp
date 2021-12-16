import React, {useEffect, useState} from "react"
import {useFetch} from "../../contexts/FetchContext"
import {useNavigate, useParams} from "react-router-dom"
import PostEditForm from "../../components/PostEditForm"

export default function PostEditContainer() {
	let navigate = useNavigate()
	let fetchData = useFetch()
	let params = useParams()

	let [postRes, setPostRes] = useState()
	let [formData, setFormData] = useState({
		title: "",
		text: "",
	})

	// GET post from api
	useEffect(() => {
		if (!params.postId) return
		let request = {
			endpoint: `/api/posts/${params.postId}/`,
			method: "GET",
		}
		fetchData(request, setPostRes)
	}, [fetchData, params.postId, setPostRes])

	// Update controlled inputs
	function handleChange(event) {
		setFormData(prevState => {
			return {
				...prevState,
				[event.target.name]: event.target.value
			}
		})
	}

	// PUT post updates to api
	function handleSubmit(event) {
		event.preventDefault()
		let request
		if (!params.postId) {
			request = {
				endpoint: "/api/posts/",
				method: "POST",
				body: JSON.stringify(formData)
			}
		} else {
			request = {
				endpoint: `/api/posts/${params.postId}/`,
				method: "PUT",
				body: JSON.stringify(formData)
			}
		}
		fetchData(request, setPostRes)
		navigate(`/post/${params.postId}/`)
	}

	// Check update response and log errors
	useEffect(() => {
		if (!postRes) return
		if (!params.postId) {
			if (postRes.data) {
				navigate(`/post/${postRes.data.id}`)
			} else if (postRes.badRequest) {
				console.log(postRes.badRequest)
			} else {
				console.log(postRes.error)
			}
		} else {
			if (postRes.data) {
				setFormData(postRes.data)
			} else if (postRes.badRequest) {
				console.log(postRes.badRequest)
			} else {
				console.log(postRes.error)
			}
		}
	}, [postRes, navigate, params.postId])

	let props = {
		handleChange,
		formData,
		handleSubmit
	}

	return (
		<PostEditForm props={props}/>
	)
}
