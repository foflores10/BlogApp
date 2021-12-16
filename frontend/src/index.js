import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"
import Http404 from "./pages/Http404"
import PostDetail from "./pages/PostDetail"
import PostEdit from "./pages/PostEdit"
import "./static/css/App.css"
import AuthProvider, {useAuth} from "./contexts/AuthContext"
import FetchProvider from "./contexts/FetchContext"
import styles from "./styles.module.css"
import SearchProvider from "./contexts/SearchContext"
import NavbarContainer from "./containers/NavbarContainer"
import CurrentPostProvider from "./contexts/CurrentPostContext"


function App() {
	let isAuth = useAuth()
	let pages

	// Set app redirects based on login status
	if (isAuth) {
		let userProfile = `/profile/${localStorage.getItem("username")}`
		pages = {
			login: <Navigate to={userProfile} />,
			signup: <Navigate to={userProfile} />,
			profile: <Navigate to={userProfile} />
		}
	} else {
		pages = {
			login: <Login />,
			signup: <Signup />,
			profile: <Navigate to="/" />,
		}
	}

	// Set app routes
	return (
		<Router>
			<div className={styles.container}>
				<nav className={styles.navbar}>
					<NavbarContainer />
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={pages.login} />
					<Route path="/signup" element={pages.signup} />
					<Route path="/profile" element={pages.profile} />
					<Route path="/profile/:username" element={<Profile />} />
					<Route path="/post" element={<Navigate to="/" />} />
					<Route path="/post/new" element={<PostEdit />} />
					<Route path="/post/:postId" element={<PostDetail />} />
					<Route path="/post/:postId/edit" element={<PostEdit />} />
					<Route path="/404" element={<Http404 />} />
					<Route path="*" element={<Navigate to="404" />} />
					<Route path="/search" element={<Home />} />
				</Routes>
			</div>
		</Router>
	)
}

// Inject JS and set contexts
ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<FetchProvider>
				<SearchProvider>
					<CurrentPostProvider>
						<App />
					</CurrentPostProvider>
				</SearchProvider>
			</FetchProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
