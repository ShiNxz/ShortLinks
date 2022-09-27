import db from '@/utils/db'
import Link from '@/models/Link'

const handler = async (req, res) => {
	await db()
	const { method } = req

	switch (method) {
		case 'POST': {
			const { id, password } = req.body
			if (!id || !password) return res.status(200).json({ sucess: false, error: 'Missing id or password' })

			const link = await Link.where('_id').equals(id)

			if (link.length < 1) return res.status(200).json({ sucess: false, error: 'הקישור לא נמצא' })

			if (link[0].password !== password) return res.status(200).json({ sucess: false, error: 'הסיסמא שגויה' })

			return res.status(200).json({ success: true, url: link[0].url })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
