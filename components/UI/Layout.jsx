import Navbar from '@/components/UI/Navbar'
import Footer from '@/components/UI/Footer'
import Main from '@/components/UI/Main'
import Head from '@/components/UI/Head'

import { AnimatePresence, motion } from 'framer-motion'
import useAuth from '@/utils/hooks/useAuth'
import FixedAd from './FixedAd'

const Layout = ({ title, children }) => {
	const { AuthModal } = useAuth()

	return (
		<>
			<Head title={title} />

			<Navbar />
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					//exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
					key={title}
				>
					<Main>{children}</Main>
				</motion.div>
			</AnimatePresence>

			{/* <FixedAd /> */}

			<AuthModal />

			<Footer />
		</>
	)
}

export default Layout
