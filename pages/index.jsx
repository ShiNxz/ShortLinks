import Navbar from '@/components/UI/Navbar'
import Footer from '@/components/UI/Footer'
import Main from '@/components/UI/Main'
import Head from '@/components/UI/Head'

import HeaderBlock from '@/components/Pages/Home/Header'
import MainBlock from '@/components/Pages/Home/Main'

const Index = () => {
	return (
		<>
			<Head title='דף ראשי' />

			<Navbar />
			<Main>
				<HeaderBlock />
				<MainBlock />
				
			</Main>
			<Footer />
		</>
	)
}

export default Index
