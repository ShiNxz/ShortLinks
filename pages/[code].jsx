import ProtectedLink from '@/components/Pages/ProtectedLink'
import Layout from '@/components/UI/Layout'
import db from '@/utils/db'
import Link from '@/utils/models/Link'
import { useEffect } from 'react'

const Home = ({ linkId }) => {
	useEffect(() => {
		document.body.classList.add('bg-neutral-50')

		return () => {
			document.body.classList.remove('bg-neutral-50')
		}
	})

	return (
		<Layout>
			<ProtectedLink id={linkId} />
		</Layout>
	)
}

export async function getServerSideProps(context) {
	await db()

	const { code } = context.params

	const url = await Link.where('shortCode').equals(code)

	if (url.length === 0)
		return {
			redirect: {
				destination: process.env.BASE_URI,
				permanent: false,
			},
		}

	const link = url[0]

	if (link.password) return { props: { linkId: JSON.parse(JSON.stringify(link._id)) } }

	link.clicks += 1

	await link.save()

	return {
		redirect: {
			destination: link.url,
			permanent: false,
		},
	}
}

export default Home
