import { verify } from 'jsonwebtoken'

import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
	await db()
	const { method } = req

	switch (method) {
		case 'GET': {
			if (!('token' in req.cookies)) return res.status(200).json({ success: false, error: 'error to auth' })

			let decoded

			if (req.cookies.token) {
				try {
					decoded = verify(req.cookies.token, process.env.SESSION_SECRET)
					let user = await User.where('userId').equals(decoded.userId)

					if (user.length > 0) {
						const { userId, username, email, role, warnings } = user[0]
						decoded = { userId, username, email, role, warnings }
					} else decoded = null
				} catch (e) {
					console.error(e)
				}
			}

			return decoded
				? res.status(200).json(decoded)
				: res.status(200).json({ success: false, error: 'Unable to auth' })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
