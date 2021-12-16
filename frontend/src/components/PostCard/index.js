import React from "react"
import {Link} from "react-router-dom"
import styles from "./styles.module.css"
import thumbsUp from "../../static/assets/thumbsUp.svg"
import comment from "../../static/assets/messageSquare.svg"
import thumbsUpSolid from "../../static/assets/thumbsUpSolid.svg"


export default function PostCard({props}) {
	return(
		<div className={styles.container}>
			<div className={styles.header}>
				<Link to={`/post/${props.postState.id}`} className={styles.postLink}>
					<h1 className={styles.title}>{props.postState.title}</h1>
				</Link>
				<Link to={`/profile/${props.postState.author.username}/`} className={styles.postLink}>
					<h4 className={styles.author}>{props.postState.author.username}</h4>
				</Link>
				</div>
				<Link to={`/post/${props.postState.id}`} className={styles.postLink}>
					<p className={styles.text}>
						{props.postState.text.length > 500 ?
						`${props.postState.text.slice(0,500)} ...` :
						props.postState.text}
					</p>
				</Link>
			<div className={styles.footer}>
				<div className={styles.comment} onClick={props.handleClick}>
				{props.postState.liked_by_user ?
					<img className={styles.thumbsUp} src={thumbsUpSolid} alt="Likes"/> :
					<img className={styles.thumbsUp} src={thumbsUp} alt="Likes"/>}
					<p className={styles.totalLikes}>{props.postState.total_likes}</p>
				</div>
				<Link to={`/post/${props.postState.id}`} className={styles.comment}>
					<img className={styles.commentSquare} src={comment} alt="Comments"/>
					<p className={styles.totalComments}>{props.postState.total_comments}</p>
				</Link>
				<p className={styles.date}>{props.postState.date_created}</p>
			</div>
		</div>
	)
}
