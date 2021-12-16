import React from "react"
import {Link} from "react-router-dom"
import styles from "./styles.module.css"
import user from "../../static/assets/user.svg"


export default function NavbarIsAuth({props}) {
	return (
		<ul className={styles.container}>
			{
				props.showEdit ?
				<li><Link className={styles.item} to={props.postEditLink}>Edit Post</Link></li> :
				null
			}
			<li>
				<Link className={styles.item} to="/post/new/">New Post</Link>
			</li>
			<li>
				<button className={styles.item} onClick={props.signOut}>Sign Out</button>
			</li>
			<li>
				<Link className={styles.anchor} to={props.userProfileLink}>
					<img className= {styles.profile} src={props.profileImage ? props.profileImage : user} alt="profile"/>
				</Link>
			</li>
		</ul>
	)

}
