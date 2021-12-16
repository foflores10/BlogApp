import React from "react"
import {Link} from "react-router-dom"
import styles from "./styles.module.css"


export default function ContentNotFound() {
	return (
		<div className={styles.container}>
			<h1>HTTP 404</h1>
			<h2>Page Not Found</h2>
			<Link className={styles.homeButton} to="/">Home</Link>
		</div>
	)
}
