import bg from '@/public/assets/ui/navbar.png'
import logo from '@/public/assets/logo.png'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import User from './User'

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
		title: 'כתובת WhatsApp',
		page: '/whatsapp',
	},
	{
		title: 'תקנון',
		page: '/terms',
	},
]

export const ItemStyled = styled.div`
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
				className={`text-lg mx-6`}
				active={active}
			>
				{title}
			</ItemStyled>
		</Link>
	)
}

const Navbar = () => {
	const router = useRouter()
	const [minimize, setMinimize] = useState(false)

	return (
		<div className='h-32 relative mb-20'>
			<div className='w-full bg-[#312d2e] p-8 h-32 flex justify-between items-center flex-row mx-auto z-10 relative lg:px-52'>
				<Link href='/'>
					<img
						src={logo.src}
						className='cursor-pointer h-12 md:h-24 lg:h-auto'
					/>
				</Link>
				<div className='lg:flex flex-row items-center hidden'>
					{pages.map(({ title, page }) => (
						<Item
							title={title}
							active={router.asPath === page}
							key={page}
							page={page}
						/>
					))}

					<div className='border-l border-[#dfc39b] h-8 w-4 ml-8' />

					<User />
				</div>
				<div className='lg:hidden block'>
					<a
						className='h-16 w-16 border-[#384D5A] p-4 block lg:hidden'
						onClick={() => setMinimize((m) => !m)}
					>
						<BiMenuAltLeft
							className={`h-full w-full duration-150 opacity-100 ${minimize ? '-scale-x-100' : ''}`}
							style={{ color: minimize ? 'orange' : 'orange' }}
						/>
					</a>
				</div>
				<div
					className={`bg-[#312d2e] flex flex-col fixed top-0 left-0 right-0 lg:hidden overflow-hidden duration-300 h-[100vh] ${
						minimize ? 'max-h-[100vh]' : 'max-h-0'
					}`}
				>
					<div className='flex flex-row justify-between items-center p-8'>
						<Link href='/'>
							<img
								src={logo.src}
								className='cursor-pointer h-12 lg:w-auto'
							/>
						</Link>
						<a
							className='h-16 w-16 border-[#384D5A] p-4 block lg:hidden'
							onClick={() => setMinimize((m) => !m)}
						>
							<BiMenuAltLeft
								className={`h-full w-full duration-150 opacity-100 ${minimize ? '-scale-x-100' : ''}`}
								style={{ color: minimize ? '#e9bb7b' : '#dfc39b' }}
							/>
						</a>
					</div>
					<div className='px-12 py-4'>
						{pages.map(({ title, page }) => (
							<div
								className='mb-6'
								key={page}
							>
								<Item
									title={title}
									active={router.asPath === page}
									page={page}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<div
				style={{ backgroundImage: `url(${bg.src})` }}
				className='w-full absolute left-0 top-32 right-0 h-12 md:h-16 lg:h-20 xl:h-20 bg-bottom bg-no-repeat bg-[length:100%_100%]'
			/>
		</div>
	)
}

export default Navbar
