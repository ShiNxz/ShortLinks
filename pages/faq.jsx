import { useEffect } from 'react'

import Layout from '@/components/UI/Layout'

import FAQ from '@/components/FAQ'

const Terms = () => {
	useEffect(() => {
		document.body.classList.add('bg-neutral-50')

		return () => {
			document.body.classList.remove('bg-neutral-50')
		}
	})

	return (
		<Layout title='שאלות נפוצות'>
			<div className='py-20'>
				<FAQ />
			</div>
		</Layout>
	)
}

export default Terms
