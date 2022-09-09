import Navbar from '@/components/UI/Navbar'
import Footer from '@/components/UI/Footer'
import Main from '@/components/UI/Main'
import Head from '@/components/UI/Head'

import MainBlock from '@/components/Pages/Home/Main'

const Index = () => {
	return (
		<>
			<Head title='קיצור כתובות' />

			<Navbar />
			<Main>
				<MainBlock />
			</Main>
			<Footer />
		</>
	)
}

export default Index
