import logo from '@/public/assets/ui/url_logo.png'
import styled from 'styled-components'
import { TiArrowDownThick } from 'react-icons/ti'
import Link from 'next/link'

export const Title = styled.h3`
	font-size: 1.7rem;
	font-weight: 400;
	color: #312d2e;
	position: relative;
	width: fit-content;
	margin-bottom: 1rem;

	@media (min-width: 640px) {
		font-size: 2.2rem;
	}

	@media (min-width: 768px) {
		font-size: 2.4rem;
	}

	@media (min-width: 1024px) {
		font-size: 2.4rem;
	}

	@media (min-width: 1280px) {
		font-size: 2.4rem;
	}

	@media (min-width: 1536px) {
		font-size: 2.5rem;
	}

	& span {
		color: #dfc39b;
		font-weight: 600;
	}

	&::after {
		position: absolute;
		content: '';
		height: 2.3px;
		bottom: 3px;
		margin: 0 auto;
		left: 0;
		right: 0;
		width: 55%;
		background: #dfc39b;
	}
`

const Header = ({ r }) => {
	return (
		<div className='bg-neutral-200'>
			<div className='flex flex-col lg:flex-row justify-between items-center container mx-auto px-8 xl:px-32 py-24'>
				<div className='lg:w-3/5'>
					<Title>
						ברוכים <span>הבאים</span>
					</Title>

					<p className='text-md md:text-lg lg:text-xl text-[#312d2e]'>
						תודה שבחרתם להיכנס לאתר שלנו! אז מה יש לנו כאן?
						<br />
						האתר הינו מספק שירות קיצור כתובות ארוכות.
						<br />
						בלחיצת כפתור תוכלו לקצר כתובת ארוכה לקצרה ולפרסם בלי בעיה! שתפו בווצאפ או בפייסבוק את האתר
						שבחרתם, קישור קצר תמיד נראה יותר נוח להבנה. כל מה שנותר לכם זה לנסות!
						<br />
						<span className='text-sm'>
							* מומלץ לפני קיצור כתובת באתר לצפות{' '}
							<Link href='/terms'>
								<a className='hover:text-blue-500 duration-200 decoration-blue-500 underline underline-offset-4'>בתנאי השימוש</a>
							</Link>{' '}
							של האתר.
						</span>
					</p>
				</div>
				<div className='p-12 hidden lg:block'>
					<img
						src={logo.src}
						alt='logo'
						className='h-full'
					/>
				</div>
			</div>
			<button
				onClick={() => r.current?.scrollIntoView({ behavior: 'smooth' })}
				className='rounded-full px-4 py-2 bg-[#312d2e] duration-300 hover:bg-[#464444] text-[#dfc39b] translate-y-5 text-lg w-fit mx-auto flex flex-row items-center font-medium cursor-pointer'
			>
				המשך לקיצור הכתובות
				<TiArrowDownThick className='mr-1' />
			</button>
		</div>
	)
}

export default Header
