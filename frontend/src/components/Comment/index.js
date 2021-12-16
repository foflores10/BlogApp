import React from "react"
import styles from "./styles.module.css"


export default function Comment({comment}) {
	return (
		<div className={styles.container}>
			<p>{comment.text}</p>
			<div className={styles.commentInfo}>
				<h6>{comment.author.username}</h6>
				<h6>{comment.date_created}</h6>
			</div>
		</div>
	)
}
