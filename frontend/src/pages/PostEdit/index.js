import React from "react"
import styles from "./styles.module.css"
import PostEditContainer from "../../containers/PostEditContainer"


export default function PostEdit() {
	return (
		<div className={styles.container}>
			<PostEditContainer />
		</div>
	)
}
