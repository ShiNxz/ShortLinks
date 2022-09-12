import NextHead from 'next/head'
import logo from '@/public/assets/logo.png'

const Head = ({ title }) => {
	const pageTitle = `קיצור כתובת | ${title}`

	return (
		<NextHead>
			<title>{pageTitle}</title>
			<meta charset='UTF-8' />
			<meta
				name='description'
				content='אתר SHRT הינו אתר לקיצור כתובות מהיר מאובטח וידידותי בחינם באינטרנט!
				קיצור כתובת תמיד גורם לך להראות הרבה יותר איכותי בתצוגה לאנשים, נסו לא תתאכזבו!'
			/>
			<meta
				name='keywords'
				content='HTML, CSS, JavaScript'
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
				content='קיצור קישורים | SHRT.co.il'
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
			<link
				rel='icon'
				href={logo.src}
			/>
		</NextHead>
	)
}

export default Head
