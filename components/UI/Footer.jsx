import logo from '@/public/assets/footerlogo.png'
import styled from 'styled-components'
import NextLink from 'next/link'

import aelogo from '@/public/assets/aelogo.png'
import oelogo from '@/public/assets/oelogo.png'

const Title = styled.h2`
	font-size: 1.5rem;
	font-weight: 400;
	color: #312d2e;
	position: relative;
	width: fit-content;
	margin-bottom: 0.6rem;

	& span {
		color: #dfc39b;
		font-weight: 500;
	}

	&::after {
		position: absolute;
		content: '';
		height: 2.3px;
		bottom: 0px;
		margin: 0 auto;
		right: 0;
		width: 55%;
		background: #dfc39b;
	}
`

const Link = styled.a`
	color: #7c7c7c;
	margin-bottom: 10px;
`

const LinksSection = ({ children }) => {
	return (
		<div className='border-l-2 border-r-2 border-neutral-300 px-10 border-dashed flex flex-col my-4 -mx-[1px]'>
			{children}
		</div>
	)
}

const Footer = () => {
	return (
		<footer className='bg-neutral-100 p-4 shadow-lg'>
			<div className='container mx-auto flex flex-col lg:flex-row justify-between '>
				<div className='flex flex-col lg:flex-row'>
					<NextLink href='/'>
						<img
							src={logo.src}
							alt='footer logo'
							className='ml-12 hidden lg:block object-contain cursor-pointer'
						/>
					</NextLink>

					<LinksSection>
						<Title>
							מידע <span>נוסף</span>
						</Title>
						<Link>קישור נוסף</Link>
						<Link>קישור נוסף</Link>
						<Link>קישור נוסף</Link>
						<Link>קישור נוסף</Link>
					</LinksSection>
					<LinksSection>
						<Title>
							מידע <span>נוסף</span>
						</Title>
						<Link>קישור נוסף</Link>
						<Link>קישור נוסף</Link>
						<Link>קישור נוסף</Link>
						<Link>קישור נוסף</Link>
					</LinksSection>
				</div>
				<div className='flex flex-row'>
					<img
						src={oelogo.src}
						alt='logo1'
						className='ml-4 object-contain'
						width={60}
					/>
					<img
						src={aelogo.src}
						alt='logo2'
						className='object-contain'
						width={80}
					/>
				</div>
			</div>
		</footer>
	)
}

export default Footer
