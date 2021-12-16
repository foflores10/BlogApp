import React from "react"
import styles from "./styles.module.css"
import thumbsUp from "../../static/assets/thumbsUp.svg"
import thumbsUpSolid from "../../static/assets/thumbsUpSolid.svg"
import commentSquare from "../../static/assets/messageSquare.svg"
import { Link } from "react-router-dom"


export default function FullPost({props}) {
	if (!props.post) return <h1>Loading...</h1>

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{props.post.title}</h1>
				<Link to={`/profile/${props.post.author.username}/`} className={styles.postLink}>
					<h3>{props.post.author.username}</h3>
				</Link>
			</div>
			<p className={styles.text}>{props.post.text}</p>
			<div className={styles.footer}>
				<div className={styles.like} onClick={props.handleClick}>
					<img
						className={styles.icon}
						src={props.post.liked_by_user ? thumbsUpSolid : thumbsUp}
						alt="likes"
					/>
				</div>
				<p className={styles.footerText}>{props.post.total_likes}</p>
				<img className={styles.icon} src={commentSquare} alt="comments"/>
				<p className={styles.footerText}>{props.post.total_comments}</p>
			</div>
		</div>
	)
}
