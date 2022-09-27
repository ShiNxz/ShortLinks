import db from '@/utils/db'
import Link from '@/models/Link'

const handler = async (req, res) => {
	await db()
	const { method } = req

	switch (method) {
		case 'GET': {
			const { id } = req.query

			let link = await Link.where('_id').equals(id)
			if (link.length < 1) return res.status(200).json({ success: false, error: 'Link not found' })

			link = link[0]

			return res.status(200).json({ success: true, link })
		}

		case 'PUT': {
			const { id } = req.query

			let link = await Link.where('_id').equals(id)
			if (link.length < 1) return res.status(200).json({ success: false, error: 'הקישור לא נמצא!' })

			link = link[0]

			const { password, notes } = req.body

			if (password === '') link.password = null
			else link.password = password

			link.notes = notes

			await link.save()

			return res.status(200).json({ success: true, link })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
