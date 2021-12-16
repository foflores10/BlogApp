import React, {useEffect, useState} from "react"
import {useSetAuth} from "../../contexts/AuthContext"
import {useFetch} from "../../contexts/FetchContext"
import LoginForm from "../../components/LoginForm"
import {useNavigate} from "react-router"


export default function LoginContainer() {
	let fetchData = useFetch()
	let setAuth = useSetAuth()
	let navigate = useNavigate()

	let [error, setError] = useState()
	let [loginRes, setLoginRes] = useState()
	let [profileRes, setProfileRes] = useState()
	let [loginData, setLoginData] = useState({
		username: "",
		password: ""
	})

	// Update controlled inputs
	function handleChange(event) {
		let name = event.target.name
		let data = event.target.value
		setLoginData(state => {
			return {
				...state,
				[name]: data
			}
		})
	}

	// POST login to api
	function handleSumbit(event) {
		event.preventDefault()
		let request = {
			endpoint: "/api/login/",
			method: "POST",
			body: JSON.stringify(loginData)
		}
		fetchData(request, setLoginRes)
	}

	// Check POST response, GET profile data from api, and log errors
	useEffect(() => {
		if (!loginRes) return
		if (loginRes.data) {
				localStorage.setItem("token", loginRes.data.token)
				let request = {
					endpoint: "/api/authors/",
					method: "GET",
					query: {
						email: loginData.username
					}
				}
				fetchData(request, setProfileRes)
		} else if (loginRes.badRequest) {
			if (loginRes.badRequest.non_field_errors) {
				setError("Incorrect email or password")
			}
		} else {
			console.error(loginRes.error)
		}
	}, [loginRes, loginData, setProfileRes, fetchData, setError])

	// Check GET response and navigate to profile page
	useEffect(() => {
		if (!profileRes) return
		if (profileRes.data) {
			localStorage.setItem("username", profileRes.data[0].username)
			setAuth(true)
			navigate(`/profile/${profileRes.data[0].username}`)
		} else if (profileRes.badRequest) {
			console.log(profileRes.badRequest)
		} else {
			console.log(profileRes.error)
		}
	}, [profileRes, setAuth, navigate])

	let props = {
		handleChange,
		handleSumbit,
		loginData,
		error
	}

	return (
		<LoginForm props={props}/>
	)
}
