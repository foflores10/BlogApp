import React, { createContext, useContext, useState } from "react"


const SearchContext = createContext()
const SetSearchContext = createContext()

export function useSearch() {
	return useContext(SearchContext)
}

export function useSetSearch() {
	return useContext(SetSearchContext)
}

export default function SearchProvider({children}) {
	const [searchQuery, setSearchQuery] = useState("")

	return (
		<SearchContext.Provider value={searchQuery}>
			<SetSearchContext.Provider value={setSearchQuery}>
				{children}
			</SetSearchContext.Provider>
		</SearchContext.Provider>
	)
}
