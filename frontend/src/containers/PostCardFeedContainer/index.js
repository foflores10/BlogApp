import React, {useEffect, useState} from "react"
import {useLocation, useParams} from "react-router"
import PostCardFeed from "../../components/PostCardFeed"
import {useFetch} from "../../contexts/FetchContext"
import {useSetCurrentPost} from "../../contexts/CurrentPostContext"
import {useSearch} from "../../contexts/SearchContext"
import { useAuth } from "../../contexts/AuthContext"

export default function PostCardFeedContainer() {
	let params = useParams()
	let search = useSearch()
	let fetchData = useFetch()
	let location = useLocation()
	let setCurrentPost = useSetCurrentPost()
	let isAuth = useAuth()

	let [response, setResponse] = useState()
	let [postData, setPostData] = useState()
	let [sortBy, setSortBy] = useState("-date_created")

	let sortByOptions = [
		<option value="-date_created" key={1}>Most Recent</option>,
		<option value="-total_likes" key={2}>Most Liked</option>
	]

	// GET posts from api
	useEffect(() => {
		setCurrentPost({
			isOwner: false,
			postId: null
		})
		let request
		if (location.pathname === "/") {
			if (search !== "") {
				console.log(search)
				request = {
					endpoint: "/api/search/",
					method: "GET",
					query: {
						order_by: sortBy,
						query: search
					}
				}
			} else {
				request = {
					endpoint: "/api/posts/",
					method: "GET",
					query: {
						order_by: sortBy,
						depth: 1
					}
				}
			}
		} else if (location.pathname.startsWith("/profile/")) {
			request = {
				endpoint: "/api/posts/",
				method: "GET",
				query: {
					order_by: sortBy,
					author: params.username,
					depth: 1
				}
			}
		}
		fetchData(request, setResponse)
	}, [sortBy, search, location, params.username, fetchData, setCurrentPost])

	// Check api response
	useEffect(() => {
		if (!response) return
		if (response.data) {
			setPostData(response.data)
		} else if (response.badRequest) {
			console.log(response.badRequest)
		} else {
			console.log(response.error)
		}
	}, [response, setPostData])

	// Update controlled inputs
	function handleChange(event) {
		setSortBy(event.target.value)
	}

	let props = {
		postData,
		handleChange,
		sortByOptions,
		sortBy
	}

	return (
		<PostCardFeed props={props} />
	)
}
