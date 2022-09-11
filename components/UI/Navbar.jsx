import bg from '@/public/assets/ui/navbar.png'
import logo from '@/public/assets/logo.png'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'

const pages = [
	{
		title: 'דף ראשי',
		page: '/',
	},
	{
		title: 'קיצור כתובות',
		page: '/shorten',
	},
	{
		title: 'תקנון',
		page: '/terms',
	},
]

const ItemStyled = styled.div`
	color: ${({ active }) => (active ? '#c2aa89' : '#fff')};
	//font-weight: ${({ active }) => (active ? '500' : '300')};
	text-decoration: none;
	transition: all 0.3s ease;
	cursor: pointer;

	&:hover {
		color: #c2aa89;
	}

	&::after {
		display: block;
		content: '';
		border-bottom: solid 2px #c2aa89;
		transform: scaleX(0);
		transition: transform 250ms ease-in-out;
	}

	&:hover::after {
		transform: scaleX(1);
	}
`

const Item = ({ title, active, page }) => {
	// Link
	return (
		<Link
			href={page}
			key={title}
		>
			<ItemStyled
				className={`text-3xl mx-6`}
				active={active}
			>
				{title}
			</ItemStyled>
		</Link>
	)
}

const Navbar = () => {
	const router = useRouter()

	return (
		<div className='h-32 relative mb-20'>
			<div className='w-full bg-[#312d2e] py-8 h-32 flex justify-between items-center flex-row container mx-auto z-10 relative'>
				<Link href='/'>
					<img src={logo.src} className='cursor-pointer' />
				</Link>
				<div className='flex flex-row'>
					{pages.map(({ title, page }) => (
						<Item
							title={title}
							active={router.asPath === page}
							key={page}
							page={page}
						/>
					))}
				</div>
			</div>
			<div
				style={{ backgroundImage: `url(${bg.src})` }}
				className='w-full absolute left-0 top-0 right-0 h-52 bg-bottom bg-no-repeat bg-[length:100%_100%]'
			/>
		</div>
	)
}

export default Navbar
