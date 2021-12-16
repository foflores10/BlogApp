import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"
import bs from "../../static/css/Bootstrap.module.css"
import { useFetch } from "../../contexts/FetchContext"
import { useNavigate, useParams } from "react-router"
import PostCardFeedContainer from "../../containers/PostCardFeedContainer"
import AuthorDetailsContainer from "../../containers/AuthorDetailsContainer"


export default function Profile() {
	let fetchData = useFetch()
	let urlParams = useParams()
	let navigate = useNavigate()

	let [response, setResponse] = useState()

	// Check if profile exists
	useEffect(() => {
		let requestParams = {
			endpoint: `/api/authors/${urlParams.username}/`,
			method: "HEAD"
		}
		fetchData(requestParams, setResponse)
	}, [fetchData, urlParams])

	// Redirect if profile does not exist
	useEffect(() => {
		if (!response) return
		if (!response.isValid) {
			console.log("NOT FOUND")
			navigate("/404")
		}
	}, [response, navigate])

	return (
		<div className={styles.container}>
			<div className={[bs["row"], bs["g-0"]].join(" ")}>
				<div className={[bs["col"], bs["flex-column"]].join(" ")}>
					<div className={styles.authorDetails}>
						<AuthorDetailsContainer />
					</div>
					<div className={styles.postCardFeed}>
						<PostCardFeedContainer />
					</div>
				</div>
			</div>
		</div>
	)
}
