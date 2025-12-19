import { Login } from "./modules/login/components/Login"
import { AppWrapper } from "./modules/app/components/AppWrapper"
import { BrowserRouter, Route } from "react-router-dom"
import { Layout } from "./modules/app/components/Layout"

function App() {
	return (
		<AppWrapper>
			<BrowserRouter>
				<Route path="/" element={ <App />}/>
				<Route path="" element
				<Route path='*' element={<h1>404 page not found</h1>} />
				<Layout>
					<h1>Hello World</h1>
					<Login/>
				</Layout>
			</BrowserRouter>
		</AppWrapper>
	)
}

export default App