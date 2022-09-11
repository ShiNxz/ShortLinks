import FAQ from '@/components/FAQ'
import HeaderBlock from '@/components/Pages/Home/Header'
import MainBlock from '@/components/Pages/Home/Main'
import Layout from '@/components/UI/Layout'
import { useEffect, useRef } from 'react'

const Index = () => {
	useEffect(() => {
		document.body.classList.add('bg-neutral-200')

		return () => {
			document.body.classList.remove('bg-neutral-200')
		}
	})

	const ref = useRef(null)

	return (
		<Layout title='דף ראשי'>
			<HeaderBlock r={ref} />
			<MainBlock r={ref} />
			<FAQ />
		</Layout>
	)
}

export default Index
