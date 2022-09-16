import db from '@/utils/db'
import Link from '@/models/Link'
import User from '@/utils/models/User'
import { verify } from 'jsonwebtoken'

const handler = async (req, res) => {
	await db()
	const { method } = req

	switch (method) {
		case 'GET': {
			const { key, value } = req.query
			let links = []

			switch (key) {
				case 'link': {
					console.log('link')
				}

				case 'user': {
					let user = await User.where('userId').equals(value).populate('links')

					if (user.length > 0) {
						user = user[0]
						links = user.links
					}

					break
				}

				default: {
					console.log('default')
				}
			}

			return res.status(200).json({ success: true, links })
		}

		case 'DELETE': {
			const { id } = req.body

			if (!('token' in req.cookies)) return res.status(200).json({ success: false, error: 'error to auth' })

			const decoded = verify(req.cookies.token, process.env.SESSION_SECRET)
			let user = await User.where('userId').equals(decoded.userId).populate('links')

			if (user.length < 1) return res.status(200).json({ success: false, error: 'error to auth' })

			const links = user[0].links.filter(link => link._id == id)
			if(links.length < 1) return res.status(200).json({ success: false, error: 'לא נמצאו קישורים' })
			
			await Link.deleteOne({ _id: id })

			return res.status(200).json({ success: true, message: 'הקישור נמחק בהצלחה!' })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
