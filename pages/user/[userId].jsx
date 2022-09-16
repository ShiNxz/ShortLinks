import db from '@/utils/db'
import Link from '@/utils/models/Link'

const Home = () => {
	return <></>
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
