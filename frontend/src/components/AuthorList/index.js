import React, {useState, useEffect} from "react"
import styles from "./styles.module.css"
import {Link} from "react-router-dom"
import AuthorTile from "../AuthorTile"


export default function AuthorList({props}) {
	let [authorList, setAuthorList] = useState()

	useEffect(() => {
		if (!props.authorData) return
		setAuthorList(props.authorData.map(author => {
			return (
				<Link to={`/profile/${author.username}`} key={author.id} className={styles.authorTile}>
						<AuthorTile author={author}/>
				</Link>
				)
		}))
	}, [props.authorData])

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Top Authors</h2>
			{authorList ? authorList : null}
		</div>
	)
}
