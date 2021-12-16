import React from "react"
import styles from "./styles.module.css"


export default function CommentInput({props}) {
	return (
		<form className={styles.container} onSubmit={props.handleSubmit}>
			<input
				className={styles.input}
				value={props.newComment}
				onChange={props.handleChange}
				placeholder="Enter a comment..."
				name="text"
				type="text"
			/>

			<button className={styles.button}>Post</button>
		</form>
	)
}
