import db from '@/utils/db'
import CheckURL from '@/utils/functions/CheckURL'
import isBlockedURL from '@/utils/functions/isBlockedURL'
import GenerateString from '@/utils/functions/GenerateString'
import Link from '@/utils/models/Link'
import User from '@/utils/models/User'
import { verify } from 'jsonwebtoken'

const handler = async (req, res) => {
	await db()

	switch (req.method) {
		case 'POST': {
			let { url, custom, password, notes } = req.body

			if (custom !== '' && !req.cookies.token)
				return res.status(200).json({ success: false, error: 'יש להתחבר על מנת לבחור קישור מותאם אישית' })
			if (password !== '' && !req.cookies.token)
				return res.status(200).json({ success: false, error: 'יש להתחבר על מנת לבחור סיסמה' })
			if (notes !== '' && !req.cookies.token)
				return res.status(200).json({ success: false, error: 'יש להתחבר על מנת לרשום הערות' })

			if (!CheckURL(url)) return res.status(200).json({ success: false, error: 'הכתובת אינה תקינה.' })
			if (isBlockedURL(url)) return res.status(200).json({ success: false, error: 'הכתובת אינה חוקית!' })

			let shortCode = GenerateString()

			if (typeof custom != 'undefined' && custom !== '') {
				if ((await Link.where('shortCode').equals(custom)).length >= 1)
					return res.status(200).json({ success: false, error: 'הקישור המותאם כבר תפוס, יש לבחור קוד אחר' })
				shortCode = custom
			}

			if (password == '') password = null

			while ((await Link.where('shortCode').equals(shortCode)).length >= 1) shortCode = GenerateString()

			const createdLink = await Link.create({
				url,
				shortCode,
				custom,
				notes,
				password,
			})

			//await Link.updateMany({}, { notes: '' })

			if (req.cookies.token) {
				try {
					let decoded = verify(req.cookies.token, process.env.SESSION_SECRET),
						user = await User.where('userId').equals(decoded.userId)

					if (user.length > 0) {
						user = user[0]
						user.links.push(createdLink._id)
						// (await User.where('userId').equals(decoded.userId).populate('links'))[0].links
						user.save()
					}
				} catch (e) {
					console.error(e)
				}
			}

			res.status(200).json({ success: true, url, shortCode, shortUrl: `${process.env.BASE_URI}/${shortCode}` })
		}

		default:
			res.status(404).end()
	}
}

export default handler
