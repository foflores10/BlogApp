import React from "react"
import styles from "./styles.module.css"
import bs from "../../static/css/Bootstrap.module.css"
import PostContainer from "../../containers/PostContainer"
import CommentSectionContainer from "../../containers/CommentSectionContainer"


export default function PostDetail() {
	return (
			<div className={styles.container}>
				<div className={[bs.row, bs["g-0"], styles["ht-100"]].join(" ")}>
					<div className={[
						bs.col, bs["col-12"], bs["px-2"]
						].join(" ")}>
						<div className={styles.post}>
							<PostContainer />
						</div>
					</div>
					<div className={[
						bs.col, bs["px-2"], styles["ht-100"]
						].join(" ")}>
						<div className={styles.commentSection}>
							<CommentSectionContainer />
						</div>
					</div>
				</div>
			</div>
	)
}
