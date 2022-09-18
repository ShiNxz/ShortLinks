// Styles
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'

// Redux
import { store } from '@/data/store'
import { Provider } from 'react-redux'

// Libraries
import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'

import Script from 'next/script'

const App = ({ Component, pageProps }) => {
	return (
		<NextUIProvider>
			<Provider store={store}>
				<Script
					src='https://cdn.enable.co.il/licenses/enable-L14488b2sr0x45vk-0922-35390/init.js%22%3E'
					strategy='beforeInteractive'
				/>

				<Component {...pageProps} />
				<ToastContainer
					rtl
					closeButton
					closeOnClick
					autoClose={3000}
				/>
			</Provider>
		</NextUIProvider>
	)
}

export default App
