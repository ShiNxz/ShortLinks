import Layout from '@/components/UI/Layout'
import WhatsApp from '@/components/Pages/Whatsapp'
import { useEffect } from 'react'

const Index = () => {
	useEffect(() => {
		document.body.classList.add('bg-neutral-50')

		return () => {
			document.body.classList.remove('bg-neutral-50')
		}
	})

	return (
		<Layout title='כתובת WhatsApp'>
			<div className='pt-8'>
				<WhatsApp />
			</div>
		</Layout>
	)
}

export default Index
