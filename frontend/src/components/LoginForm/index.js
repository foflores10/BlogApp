import React from "react"
import styles from "./styles.module.css"


export default function LoginForm({props}) {
	return (
		<form className={styles.container} onSubmit={props.handleSumbit}>
			<h1 className={styles.brand}>BlogIt</h1>

			{props.error ? <h4 className={styles.error}>{props.error}</h4> : null}

			<label className={styles.label} name="username">Email</label>
			<input
				className={styles.input}
				value={props.loginData.username}
				onChange={props.handleChange}
				name="username"
				type="text"
			/>

			<label className={styles.label} name="password">Password</label>
			<input
				className={styles.input}
				value={props.loginData.password}
				onChange={props.handleChange}
				name="password"
				type="password"
			/>

			<button className={styles.loginButton}>Login</button>
		</form>
	)
}
