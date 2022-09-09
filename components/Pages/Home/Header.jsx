import logo from '@/public/assets/ui/url_logo.png'
import styled from 'styled-components'
import { TiArrowDownThick } from 'react-icons/ti'

export const Title = styled.h3`
	font-size: 2.5rem;
	font-weight: 400;
	color: #312d2e;
	position: relative;
	width: fit-content;
	margin-bottom: 1rem;

	& span {
		color: #dfc39b;
		font-weight: 600;
	}

	&::after {
		position: absolute;
		content: '';
		height: 3.3px;
		bottom: 3px;
		margin: 0 auto;
		left: 0;
		right: 0;
		width: 55%;
		background: #dfc39b;
	}
`

const Paragraph = styled.p`
	font-size: 1.3rem;
	color: #312d2e;

	& span {
		font-size: 1.1rem;
	}
`

const Header = () => {
	return (
		<div className='bg-neutral-200'>
			<div className='flex flex-row justify-between items-center container mx-auto px-32 py-24'>
				<div className='w-3/5'>
					<Title>
						ברוכים <span>הבאים</span>
					</Title>

					<Paragraph>
						תודה שבחרתם להיכנס לאתר שלנו! אז מה יש לנו כאן?
						<br />
						האתר הינו מספק שירות קיצור כתובות ארוכות.
						<br />
						בלחיצת כפתור תוכלו לקצר כתובת ארוכה לקצרה ולפרסם בלי בעיה! שתפו בווצאפ או בפייסבוק את האתר
						שבחרתם, קישור קצר תמיד נראה יותר נוח להבנה. כל מה שנותר לכם זה לנסות!
						<br />
						<span>* מומלץ לפני קיצור כתובת באתר לצפות בתנאי השימוש של האתר.</span>
					</Paragraph>
				</div>
				<div className='p-12'>
					<img
						src={logo.src}
						alt='logo'
						className='h-full'
					/>
				</div>
			</div>
			<div className='rounded-full px-4 py-2 bg-[#312d2e] duration-300 hover:bg-[#464444] text-[#dfc39b] translate-y-5 text-lg w-fit mx-auto flex flex-row items-center font-medium cursor-pointer'>
				המשך לקיצור הכתובות
				<TiArrowDownThick className='mr-1' />
			</div>
		</div>
	)
}

export default Header
