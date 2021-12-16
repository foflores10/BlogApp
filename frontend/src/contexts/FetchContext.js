import React, { createContext, useContext } from "react"
import { useAuth } from "./AuthContext"


const FetchContext = createContext()

export function useFetch() {
	return useContext(FetchContext)
}

export default function FetchProvider({ children }) {
	let isAuth = useAuth()
	async function fetchData(request, setResponse) {
		let apiUrl = new URL(request.endpoint, "http://192.168.1.10:8000")

		for (let key in request.query) {
			apiUrl.searchParams.append(key, request.query[key])
		}

		let headers = { "Content-Type": "application/json" }
		if (isAuth) {
			headers = {
				...headers,
				Authorization: `Token ${localStorage.getItem("token")}`
			}
		}

		let requestParams = {
			method: request.method,
			headers: headers,
			body: request.body
		}

		if (request.noCT) {
			delete requestParams.headers["Content-Type"]
		}

		console.log(requestParams)

		let response = await fetch(apiUrl, requestParams)
		if (request.method === "HEAD" && response.ok){
			setResponse({isValid: true})
		} else if (request.method === "HEAD") {
			setResponse({isValid: false})
		} else if (response.ok) {
			let data = await response.json()
			setResponse({data: data})
		} else {
			try {
				let data = await response.json()
				setResponse({badRequest: data})
			} catch (error) {
				setResponse({error: error})
			}
		}
	}

	return (
		<FetchContext.Provider value={fetchData}>
			{children}
		</FetchContext.Provider>
	)
}
