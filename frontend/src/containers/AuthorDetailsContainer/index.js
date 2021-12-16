import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {useAuth} from "../../contexts/AuthContext"
import {useFetch} from "../../contexts/FetchContext"
import AuthorDetailsView from "../../components/AuthorDetailsView"
import AuthorDetailsEdit from "../../components/AuthorDetailsEdit"

export default function AuthorDetailsContainer() {
	let urlParams = useParams()
	let fetchData = useFetch()
	let isAuth = useAuth()

	let [error, setError] = useState()
	let [edit, setEdit] = useState(false)
	let [showEdit, setShowEdit] = useState(false)
	let [fetchRes, setFetchRes] = useState()
	let [updateRes, setUpdateRes] = useState()
	let [imageRes, setImageRes] = useState()
	let [authorData, setAuthorData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		about: ""
	})

	// GET author profile information from api
	useEffect(() => {
		let request = {
			endpoint: `/api/authors/${urlParams.username}/`,
			method: "GET"
		}
		fetchData(request, setFetchRes)
	}, [fetchData, setFetchRes, urlParams.username])

	// Check GET response and log any errors
	useEffect(() => {
		if (!fetchRes) return
		if (fetchRes.data) {
			if (isAuth && fetchRes.data.username === localStorage.getItem("username")){
				setShowEdit(true)
			}
			console.log(fetchRes.data)
			setAuthorData(fetchRes.data)
		} else if (fetchRes.badRequest) {
			console.error(fetchRes.badRequest)
		} else {
			console.error(fetchRes.error)
		}
	}, [fetchRes, setAuthorData, isAuth])

	// Check PUT response and log any errors
	useEffect(() => {
		if (!updateRes) return
		if (updateRes.data) {
			setEdit(false)
		} else if (updateRes.badRequest) {
			for (let field in updateRes.badRequest) {
				setError(updateRes.badRequest[field][0])
			}
		} else {
			console.log(updateRes.error)
		}
	}, [updateRes])

	// PUT updated author information to api
	function updateAuthor() {
		let request = {
			endpoint: `/api/authors/${urlParams.username}/`,
			method: "PUT",
			body: JSON.stringify(authorData)
		}
		fetchData(request, setUpdateRes)
	}

	// Update controlled inputs
	function handleChange(event) {
		setAuthorData(prevState => {
			return {
				...prevState,
				[event.target.name]: event.target.value
			}
		})
	}

	// Handle image update
	function handleImage(event) {
		let img = event.target.files[0]
		let formData = new FormData()
		formData.append("file", img, img.name)
		let request = {
			endpoint: "/api/profile-image/",
			method: "POST",
			body: formData,
			noCT: true
		}
		fetchData(request, setImageRes)
		setAuthorData(prevState => {
			return {
				...prevState,
				profile_image: URL.createObjectURL(img)
			}
		})
	}

	useEffect(() => {
		if (!imageRes) return
		if (imageRes.badRequest || imageRes.error) {
			console.log(imageRes)
		}
	}, [imageRes])

	let props = {
		authorData,
		setAuthorData,
		updateAuthor,
		error,
		setEdit,
		showEdit,
		isAuth,
		handleChange,
		handleImage
	}

	return (
		edit ? <AuthorDetailsEdit props={props}/> : <AuthorDetailsView props={props}/>
	)
}
