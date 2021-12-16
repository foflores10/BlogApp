import React, { useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../../components/SearchBar"
import { useSetSearch } from "../../contexts/SearchContext";

export default function SearchContainer() {
	let navigate = useNavigate()
	let setSearch = useSetSearch()

	let [searchQuery, setSearchQuery] = useState("")

	// Navigate to search results and set the search query
	function handleSubmit(event) {
		event.preventDefault()
		setSearch(searchQuery)
		setSearchQuery("")
		navigate("")
	}

	// Update controlled input
	function handleChange(event) {
		setSearchQuery(event.target.value)
	}

	let props = {
		searchQuery,
		handleChange,
		handleSubmit
	}

	return (
		<SearchBar props={props} />
	)
}
