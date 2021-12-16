import React, { createContext, useContext, useState } from "react"


const AuthContext = createContext()
const SetAuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function useSetAuth() {
	return useContext(SetAuthContext)
}

export default function AuthProvider({ children }) {
	let checkAuth = (localStorage.getItem("token") && localStorage.getItem("username")) ? true : false
	const [auth, setAuth] = useState(checkAuth)

	return (
		<AuthContext.Provider value={auth}>
			<SetAuthContext.Provider value={setAuth}>
				{children}
			</SetAuthContext.Provider>
		</AuthContext.Provider>
	)
}
