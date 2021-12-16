import React from "react"
import styles from "./styles.module.css"
import bs from "../../static/css/Bootstrap.module.css"
import AuthorFeedContainer from "../../containers/AuthorFeedContainer"
import PostCardFeedContainer from "../../containers/PostCardFeedContainer"


export default function Home() {
	return (
		<div className={styles.container}>
			<div className={[bs["row"], bs["g-0"]].join(" ")}>
				<div className={[
					bs["col"], bs["col-md-9"], bs["col-sm-8"], bs["col-12"], bs["px-2"]
					].join(" ")}>
					<div className={styles.postCardFeed}>
						<PostCardFeedContainer />
					</div>
				</div>
				<div className={[
					bs["col"], bs["col-md-3"], bs["col-sm-4"], bs["col-12"], bs["px-2"]
					].join(" ")}>
					<div className={styles.AuthorFeed}>
						<AuthorFeedContainer />
					</div>
				</div>
			</div>
		</div>
	)
}
