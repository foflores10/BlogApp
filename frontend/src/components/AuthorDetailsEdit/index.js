import React from "react"
import styles from "./styles.module.css"
import user from "../../static/assets/user.svg"


export default function AuthorDetailsEdit({props}) {
	if (!props.authorData) return <h1>Loading...</h1>

	return (
		<form className={styles.container} onSubmit={props.updateAuthor}>
			<img className={styles.authorImage} src={props.authorData.profile_image ? props.authorData.profile_image : user} alt="User Profile"/>
			<input type="file" name="newImage" onChange={props.handleImage} accept="image/*"/>

			{props.error ? props.error : null}

			<div className={styles.detailContainer}>
				<div className={styles.detailLabels}>
					<h4 className={styles.detail}>Username:</h4>
					<h4 className={styles.detail}>First Name:</h4>
					<h4 className={styles.detail}>Last Name:</h4>
					<h4 className={styles.detail}>Email:</h4>
					<h4 className={styles.detail}>Post Count:</h4>
					<h4 className={styles.detail}>Post Likes:</h4>
				</div>

				<div className={styles.detailData}>
					<p className={styles.detail}>{props.authorData.username}</p>
					<input
						className={styles.detailInput}
						type="text"
						value={props.authorData.first_name}
						name="first_name"
						onChange={props.handleChange}
					/>
					<input
						className={styles.detailInput}
						type="text" value={props.authorData.last_name}
						name="last_name"
						onChange={props.handleChange}
					/>
					<input
						className={styles.detailInput}
						type="text"
						value={props.authorData.email}
						name="email"
						onChange={props.handleChange}
					/>
					<p className={styles.detail}>{props.authorData.total_posts}</p>
					<p className={styles.detail}>{props.authorData.total_post_likes}</p>
				</div>
			</div>

			<div className={styles.aboutMe}>
				<h4 className={styles.title}>About Me</h4>
				<textarea
					className={styles.textArea}
					value={props.authorData.about}
					onChange={props.handleChange}
					name="about"
				/>
			</div>

			<button className={styles.editButton}>Done</button>
		</form>
	)
}
