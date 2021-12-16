import React, { createContext, useContext, useState } from "react"

const CurrentPostContext = createContext()
const SetCurrentPostContext = createContext()

export function useCurrentPost() {
	return useContext(CurrentPostContext)
}

export function useSetCurrentPost() {
	return useContext(SetCurrentPostContext)
}

export default function CurrentPostProvider({ children }) {
	const [currentPost, setCurrentPost] = useState({
		isOwner: false,
		postId: null
	})

	return (
		<CurrentPostContext.Provider value={currentPost}>
			<SetCurrentPostContext.Provider value={setCurrentPost}>
				{children}
			</SetCurrentPostContext.Provider>
		</CurrentPostContext.Provider>
	)
}
