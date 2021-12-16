import React, { useEffect, useState } from "react"
import { useSetAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import SignupForm from "../../components/SignupForm"
import { useFetch } from "../../contexts/FetchContext"

export default function SignupContainer() {
	let setAuth = useSetAuth()
	let fetchData = useFetch()
	let navigate = useNavigate()

	let [error, setError] = useState()
	let [loginRes, setLoginRes] = useState()
	let [signupRes, setSignupRes] = useState()
	let [formErrors, setFormErrors] = useState({})
	let [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		username: "",
		password1: "",
		password2: ""
	})

	// POST new author to api
	function handleSubmit(event) {
		event.preventDefault()

		if (formData.password1 !== formData.password2) {
			setError("Password fields do not match")
			return
		}

		let author = {
			first_name: formData.first_name,
			last_name: formData.last_name,
			email: formData.email,
			username: formData.username,
			password: formData.password1
		}

		let request = {
			endpoint: "/api/authors/",
			method: "POST",
			body: JSON.stringify(author)
		}
		fetchData(request, setSignupRes)
	}

	// Check POST response, log errors, and login
	useEffect(() => {
		if (!signupRes) return

		if (signupRes.data) {
			localStorage.setItem("username", signupRes.data.username)
			let request = {
				endpoint: "/api/login/",
				method: "POST",
				body: JSON.stringify({
					username: formData.email,
					password: formData.password1
				})
			}
			fetchData(request, setLoginRes)
		} else if (signupRes.badRequest) {
			for (let field in signupRes.badRequest) {
				setFormErrors(prevState => {
					return {
						...prevState,
						[field]: signupRes.badRequest[field]
					}
				})
			}
		} else {
			setError("Server error, please try again later")
		}
	}, [signupRes, fetchData, formData])

	// Check login response
	useEffect(() => {
		if (!loginRes) return
		localStorage.setItem("token", loginRes.data.token)
		setAuth(true)
		navigate(`/profile/${localStorage.getItem("username")}`)
	}, [loginRes, navigate, setAuth])

	// Update controlled inputs
	function handleChange(event) {
		setFormData(prevState => {
			return {
				...prevState,
				[event.target.name]: event.target.value
			}
		})
	}

	let props = {
		handleSubmit,
		handleChange,
		formData,
		formErrors,
		error
	}

	return (
		<SignupForm props={props} />
	)
}
