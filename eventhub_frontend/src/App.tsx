import { AppWrapper } from "./modules/app/components/AppWrapper"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./modules/login/components/Login"
import { Register } from "./modules/register/components/Register"
import { Profile } from "./modules/profile/components/Profile"

function App() {

	return (
		<AppWrapper>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</BrowserRouter>
		</AppWrapper>
	)
}

export default App