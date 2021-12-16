import React from "react"
import {Link} from "react-router-dom"
import styles from "./styles.module.css"
import NavbarIsAuth from "../NavbarIsAuth"
import NavbarNotAuth from "../NavbarNotAuth"
import SearchBarContainer from "../../containers/SearchBarContainer"

export default function Navbar({props}) {
	return (
		<ul className={styles.container}>
				<li>
					<Link className={styles.brand} to="/">BlogIt</Link>
				</li>
				<li className={styles.searchBar}>
					<SearchBarContainer/>
				</li>
				<li className={styles.auth}>
					{props.isAuth ? <NavbarIsAuth props={props}/> : <NavbarNotAuth/>}
				</li>
		</ul>
	)
}
