import React from "react"
import {Link} from "react-router-dom"
import styles from "./styles.module.css"


export default function NavbarNotAuth() {
	return (
		<ul className={styles.container}>
			<li>
				<Link className={styles.item} to="/login">Login</Link>
			</li>
			<li>
				<Link className={styles.item} to="/signup">Signup</Link>
			</li>
		</ul>
	)
}
