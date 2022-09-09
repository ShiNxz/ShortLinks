import bg from '@/public/assets/ui/navbar.png'
import logo from '@/public/assets/logo.png'

const pages = [
	{
		title: 'דף ראשי',
		active: true,
	},
	{
		title: 'קיצור כתובות',
	},
	{
		title: 'מידע נוסף',
	},
]

const Item = ({ title, active }) => {
	// Link
	return (
		<div
			className={`text-3xl mx-6 ${
				active ? 'text-[#c2aa89] font-medium' : 'text-white font-light'
			} hover:text-[#c2aa89] duration-200 `}
		>
			{title}
		</div>
	)
}

const Navbar = () => {
	return (
		<div className='h-32 relative'>
			<div className='w-full bg-[#312d2e] py-8 h-32 flex justify-between items-center flex-row container mx-auto z-10 relative'>
				<img src={logo.src} />
				<div className='flex flex-row'>
					{pages.map(({ title, active }) => (
						<Item
							title={title}
							active={active}
							key={title}
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
