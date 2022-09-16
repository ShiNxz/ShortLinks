import useAuth from '@/utils/hooks/useAuth'

import { useEffect } from 'react'

import Layout from '@/components/UI/Layout'

import Links from '@/components/Account/Links'

const Terms = () => {
	useEffect(() => {
		document.body.classList.add('bg-neutral-50')

		return () => {
			document.body.classList.remove('bg-neutral-50')
		}
	})

	const { loggedIn, user } = useAuth()

	return (
		<Layout title='קישורים שנוצרו'>
			<div className='flex flex-col items-center container mx-auto px-8 py-24'>
				{loggedIn ? (
					<Links
						Key='user'
						Value={user.userId}
					/>
				) : (
					<>עליך להתחבר על מנת לצפות בקישורים</>
				)}
			</div>
		</Layout>
	)
}

export default Terms
