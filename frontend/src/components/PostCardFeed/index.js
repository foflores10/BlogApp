import React, {useEffect, useState} from "react"
import PostCardContainer from "../../containers/PostCardContainer"
import styles from "./styles.module.css"


export default function PostCardFeed({props}) {
	let [posts, setPosts] = useState()

	useEffect(() => {
		if (!props.postData) return
		let posts = props.postData.map(post => {
			return (
				<div className={styles.post} key={post.id}>
					<PostCardContainer post={post}/>
				</div>
			)
		})
		setPosts(posts)
	}, [props.postData])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>Posts</h2>
				<div className={styles.sortBy}>
					<p className={styles.sortByText}>Sort by:</p>
					<select
						className={styles.sortBySelect}
						value={props.sortBy}
						onChange={props.handleChange}
					>
						{props.sortByOptions}
					</select>
				</div>
			</div>
			{posts}
		</div>
	)
}
