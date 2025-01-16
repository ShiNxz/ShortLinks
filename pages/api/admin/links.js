import db from '@/utils/db'
import Link from '@/models/Link'
import User from '@/utils/models/User'
import { verify } from 'jsonwebtoken'
import { Types } from 'mongoose'

const handler = async (req, res) => {
	await db()
	const { method } = req

	if (!('token' in req.cookies)) return res.status(200).json({ success: false, error: 'error to auth' })

	const decoded = verify(req.cookies.token, process.env.SESSION_SECRET)
	let user = await User.where('userId').equals(decoded.userId).populate('links')

	if (user.length < 1) return res.status(200).json({ success: false, error: 'error to auth' })

	if(user[0].role !== 'admin') return res.status(200).json({ success: false, error: 'error to auth' })

	switch (method) {
		case 'GET': {
			const { page } = req.query

			const links = await Link.find().sort({ createdAt: -1 }).skip((page - 1) * 10).limit(10)

			const total = await Link.countDocuments()

			return res.status(200).json({ success: true, links, total })
		}

		case 'DELETE': {
			try {
				const { id } = req.body
				
				await Link.findOneAndDelete({ _id: 
					new Types.ObjectId(id) 
				})
				
				return res.status(200).json({ success: true, message: 'הקישור נמחק בהצלחה!' })
			} catch (error) {
				return res.status(200).json({ success: false, error: 'הקישור לא נמצא!' })
			}
		}

		default:
			return res.status(401).end()
	}
}

export default handler
