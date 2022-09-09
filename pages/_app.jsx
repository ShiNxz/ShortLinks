import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'

import { ToastContainer } from 'react-toastify'

const App = ({ Component, pageProps }) => {
	return (
		<>
			<Component {...pageProps} />
			<ToastContainer
				rtl
				closeButton
				closeOnClick
				autoClose={3000}
			/>
		</>
	)
}

export default App
