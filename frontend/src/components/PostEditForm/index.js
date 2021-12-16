import React from "react"
import styles from "./styles.module.css"


export default function EditForm({ props }) {
	return (
		<form className={styles.container} onSubmit={props.handleSubmit}>
			<h1 className={styles.title}>New Post</h1>

			{props.error ? <h5>{props.error}</h5> : null}

			<label className={styles.label} htmlFor="title">Title</label>
			<input
				className={styles.inputTitle}
				value={props.formData.title}
				onChange={props.handleChange}
				placeholder="Choose a title..."
				name="title"
				type="text"
			/>

			<label className={styles.label} htmlFor="text">Content</label>
			<textarea
				className={styles.inputText}
				value={props.formData.text}
				onChange={props.handleChange}
				placeholder="Add some text..."
				name="text"
			/>

			<button className={styles.button}>Post</button>
		</form>
	)
}
