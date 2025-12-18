import { Login } from "./modules/login/components/Login"
import { AppWrapper } from "./modules/app/components/AppWrapper"
import { Layout } from "./modules/app/components/Layout"

function App() {
	return (
		<AppWrapper>
			<Layout>
				<h1>Hello World</h1>
				<Login/>
			</Layout>
		</AppWrapper>
	)
}

export default App