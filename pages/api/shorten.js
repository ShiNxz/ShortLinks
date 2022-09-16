import db from '@/utils/db'
import CheckURL from '@/utils/functions/CheckURL'
import isBlockedURL from '@/utils/functions/isBlockedURL'
import GenerateString from '@/utils/functions/GenerateString'
import Link from '@/utils/models/Link'

const handler = async (req, res) => {
	await db()

	switch (req.method) {
		case 'POST': {
			const { url, customId } = req.body

			if (!CheckURL(url)) return res.status(200).json({ success: false, error: 'הכתובת אינה תקינה.' })

			if (isBlockedURL(url)) return res.status(200).json({ success: false, error: 'הכתובת אינה חוקית!' })

			let shortCode = GenerateString()
			while ((await Link.where('shortCode').equals(shortCode)).length >= 1) {
				shortCode = GenerateString()
			}

			await Link.create({
				url,
				shortCode,
			})

			// make it delayed by 1000 ms
			// await new Promise((resolve) => setTimeout(() => resolve(), 1000))

			res.status(200).json({ success: true, url, shortCode, shortUrl: `${process.env.BASE_URI}/${shortCode}` })
		}

		default:
			res.status(404).end()
	}
}

export default handler
