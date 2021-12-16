import React from "react"
import styles from "./styles.module.css"


export default function SearchBar({props}) {
	return (
		<div className={styles.container}>
			<form onSubmit={props.handleSubmit}>
				<input
					className={styles.searchInput}
					value={props.searchQuery.text}
					onChange={props.handleChange}
					placeholder="search posts"
					name="text"
					type="text"
				/>
				<button className={styles.searchButton}>Search</button>
			</form>
		</div>
	)
}
