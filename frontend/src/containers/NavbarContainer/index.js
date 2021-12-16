import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router"
import Navbar from "../../components/Navbar"
import {useAuth, useSetAuth} from "../../contexts/AuthContext"
import {useCurrentPost} from "../../contexts/CurrentPostContext"
import {useFetch} from "../../contexts/FetchContext"

export default function NavbarContainer() {
	let isAuth = useAuth()
	let setAuth = useSetAuth()
	let navigate = useNavigate()
	let currentPost = useCurrentPost()
	let fetchData = useFetch()

	let [profileData, setProfileData] = useState()
	let [profileImage, setProfileImage] = useState()

	function signOut() {
		localStorage.removeItem("token")
		localStorage.removeItem("username")
		setAuth(false)
		navigate("")
	}

	// Get profile image
	useEffect(() => {
		if (!isAuth) return
		let request = {
			endpoint: `/api/authors/${localStorage.getItem("username")}/`,
			method: "GET",
		}
		fetchData(request, setProfileData)
	},[fetchData, isAuth, setProfileData])

	// Check response and set image
	useEffect(() => {
		if (!profileData) return
		setProfileImage(profileData.data.profile_image)
	}, [profileData, setProfileImage])


		let props = {
			isAuth: isAuth,
			showEdit: currentPost.isOwner,
			postEditLink: `/post/${currentPost.postId}/edit`,
			signOut: signOut,
			userProfileLink: `/profile`,
			profileImage
		}

	return (
		<Navbar props={props} />
	)
}
