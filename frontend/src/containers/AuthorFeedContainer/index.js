import React, {useEffect, useState} from "react"
import AuthorList from "../../components/AuthorList"
import {useFetch} from "../../contexts/FetchContext"


export default function AuthorFeedContainer() {
	let fetchData = useFetch()
	let [response, setResponse] = useState()
	let [authorData, setAuthorData] = useState()

	// GET most liked author data from api
	useEffect(() => {
		let request = {
			endpoint: "/api/authors/",
			method: "GET",
			query: {
				order_by: "-total_post_likes",
				limit: 5
			}
		}
		fetchData(request, setResponse)
	}, [fetchData, setResponse])

	// Check GET response and log any errors
	useEffect(() => {
		if (!response) return
		if (response.data) {
			console.log(response.data)
			setAuthorData(response.data)
		} else if (response.badRequest) {
			console.log(response.badRequest)
		} else {
			console.log(response.error)
		}
	}, [response, setAuthorData])

	let props = {authorData}

	return (
		<AuthorList props={props}/>
	)
}
