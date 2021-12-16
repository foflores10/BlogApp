import React from "react"
import styles from "./styles.module.css"
import user from "../../static/assets/user.svg"


export default function AuthorDetailsView({props}) {
	if (!props.authorData) return <h1>Loading...</h1>

	return (
		<div className={styles.container}>
			<img className={styles.authorImage} src={props.authorData.profile_image ? props.authorData.profile_image : user} alt="User Profile"/>

			<div className={styles.detailContainer}>
				<div className={styles.detailLabels}>
						<h4 className={styles.detail}>Username:</h4>
						<h4 className={styles.detail}>Name:</h4>
						<h4 className={styles.detail}>Post Count:</h4>
						<h4 className={styles.detail}>Post Likes:</h4>
				</div>

				<div className={styles.detailData}>
					<p className={styles.detail}>{props.authorData.username}</p>
					<p className={styles.detail}>
						{`${props.authorData.first_name} ${props.authorData.last_name}`}
					</p>
					<p className={styles.detail}>{props.authorData.total_posts}</p>
					<p className={styles.detail}>{props.authorData.total_post_likes}</p>
				</div>
			</div>

			<div className={styles.aboutMe}>
				<h4 className={styles.title}>About Me</h4>
				<p className={styles.linebr}>{props.authorData.about}</p>
			</div>

			{
				props.showEdit ?
				<button className={styles.editButton} onClick={() => props.setEdit(edit => !edit)}>
					Edit
				</button> :
				null
			}

		</div>
	)
}
