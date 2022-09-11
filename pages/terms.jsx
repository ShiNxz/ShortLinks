import { useEffect } from 'react'

import Layout from '@/components/UI/Layout'

import TermsofService from '@/components/Pages/Terms'

const Terms = () => {
	useEffect(() => {
		document.body.classList.add('bg-neutral-200')

		return () => {
			document.body.classList.remove('bg-neutral-200')
		}
	})

	return (
		<Layout title='תקנון'>
			<TermsofService />
		</Layout>
	)
}

export default Terms
