import React from "react"
import styles from "./styles.module.css"
import ContentNotFound from "../../components/ContentNotFound"


export default function Http404() {
	return (
		<div className={styles.container}>
			<ContentNotFound />
		</div>
	)
}
