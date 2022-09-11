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

	return {
		redirect: {
			destination: url[0].url,
			permanent: false,
		},
	}
}

export default Home
