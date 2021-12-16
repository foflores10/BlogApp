import React, {useEffect, useState} from "react"
import CommentInput from "../CommentInput"
import styles from "./styles.module.css"
import Comment from "../Comment"


export default function CommentSection({props}) {
	let [comments, setComments] = useState()

	useEffect(() => {
		if (!props.commentData) return
		let comments = props.commentData.map(comment => {
			return (
				<div className={styles.post} key={comment.id}>
					<Comment comment={comment}/>
				</div>
			)
		})
		setComments(comments)
	}, [props.commentData])

	return (
		<div className={styles.container}>
			<div className={styles.commentsContainer}>
				{comments ? comments : <h1>Loading...</h1>}
			</div>
			<div className={styles.commentInput}>
				<CommentInput props={props}/>
			</div>
		</div>
	)
}
