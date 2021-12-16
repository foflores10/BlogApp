import React from "react"
import styles from "./styles.module.css"


export default function SignupForm({props}) {
	return (
		<form className={styles.container} onSubmit={props.handleSubmit}>
			<h1 className={styles.title}>BlogIt</h1>

			{props.error ? <h5>{props.error}</h5> : null}

			<label className={styles.label} htmlFor="first_name">First Name</label>
			{props.formErrors.first_name ? <h5>{props.formErrors.first_name}</h5> : null}
			<input
				className={styles.input}
				onChange={props.handleChange}
				value={props.formData.firstName}
				name="first_name"
				type="text"
			/>

			<label className={styles.label} htmlFor="last_name">Last Name</label>
			{props.formErrors.last_name ? <h5>{props.formErrors.last_name}</h5> : null}
			<input
				className={styles.input}
				onChange={props.handleChange}
				value={props.formData.lastName}
				name="last_name"
				type="text"
			/>

			<label className={styles.label} htmlFor="username">Username</label>
			{props.formErrors.username ? <h5>{props.formErrors.username}</h5> : null}
			<input
				className={styles.input}
				onChange={props.handleChange}
				value={props.formData.username}
				name="username"
				type="text"
			/>

			<label className={styles.label} htmlFor="email">Email</label>
			{props.formErrors.email ? <h5>{props.formErrors.email}</h5> : null}
			<input
				className={styles.input}
				value={props.formData.email}
				onChange={props.handleChange}
				name="email"
				type="text"
			/>

			<label className={styles.label} htmlFor="password1">Password</label>
			{props.formErrors.password ? <h5>{props.formErrors.password}</h5> : null}
			<input
				className={styles.input}
				value={props.formData.password1}
				onChange={props.handleChange}
				name="password1"
				type="password"
			/>

			<label className={styles.label} htmlFor="password2">Confirm Password</label>
			<input
				className={styles.input}
				value={props.formData.password2}
				onChange={props.handleChange}
				name="password2"
				type="password"
			/>

			<button className={styles.button}>Signup</button>
		</form>
	)
}
