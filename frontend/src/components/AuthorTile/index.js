import React from "react"
import styles from "./styles.module.css"
import user from "../../static/assets/user.svg"
import thumbsUp from "../../static/assets/thumbsUp.svg"


export default function AuthorTile({author}) {
	return (
		<div className={styles.container}>
			<img className={styles.authorImg} src={author.profile_image ? author.profile_image : user} alt="profile"/>

			<div className={styles.authorInfo}>
				<p className={styles.authorName}>{author.first_name} {author.last_name}</p>
				<p className={styles.authorUsername}>{author.username}</p>
			</div>

			<div className={styles.authorLikes}>
				<img className={styles.thumbsUp} src={thumbsUp} alt="thumbs up"/>
				<p className={styles.likeCount}>{author.total_post_likes}</p>
			</div>
		</div>
	)
}
