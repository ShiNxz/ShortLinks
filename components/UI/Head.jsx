import NextHead from 'next/head'
import logo from '@/public/assets/logo.png'
import Script from 'next/script'

const Head = ({ title }) => {
	const pageTitle = `SHRT | ${title || 'קיצור כתובות באינטרנט'}`

	return (
		<NextHead>
			<title>{pageTitle}</title>
			<meta charSet='UTF-8' />
			<meta
				name='google-site-verification'
				content='HXX30vTPWj--aqy4R5qXWmWZ3lxWagnubvv9kDjJtLY'
			/>
			<meta
				name='description'
				content='אתר SHRT הינו אתר לקיצור כתובות מהיר מאובטח וידידותי בחינם באינטרנט!
				קיצור כתובת תמיד גורם לך להראות הרבה יותר איכותי בתצוגה לאנשים, נסו לא תתאכזבו!'
			/>
			<meta
				name='keywords'
				content='לינק, קיצור, קיצור לינק, קיצור לינק מאובטח, מאובטח, לינק קצר, חינם, צצרו בחינם, קיצור בהתאמה אישית, קיצור כתובות, כתובות, קיצור כתובות בחינם, לינק מקוצר, בהתאמה, בהתאמה אישית, אישית, חינם לגמרי, ליצירת קיצור, הודעה לינק'
			/>
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1.0'
			/>
			<meta
				name='url'
				content='http://shrt.co.il'
			/>
			<meta
				property='og:title'
				content='SHRT.co.il | קיצור כתובות באינטרנט'
			/>
			<meta
				property='og:url'
				content='http://shrt.co.il'
			/>
			<meta
				property='og:image'
				content={logo.src}
			/>
			<meta
				property='og:description'
				content='אתר SHRT הינו אתר לקיצור כתובות מהיר מאובטח וידידותי בחינם באינטרנט!
				קיצור כתובת תמיד גורם לך להראות הרבה יותר איכותי בתצוגה לאנשים, נסו לא תתאכזבו!'
			/>
			<meta
				property='og:color'
				content='#dfc39b'
			/>
			<link
				rel='icon'
				href={logo.src}
			/>
			<Script src='https://cdn.enable.co.il/licenses/enable-L14488b2sr0x45vk-0922-35390/init.js%22%3E' />
		</NextHead>
	)
}

export default Head
