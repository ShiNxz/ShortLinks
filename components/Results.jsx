import ReactLoading from 'react-loading'

const Results = () => {
	const handleFocus = (event) => event.target.select()

	return (
		<div className='mt-10'>
			<ReactLoading
				type='spinningBubbles'
				color='#312d2e'
				height='20%'
				width='20%'
				className='mb-8 mx-auto'
			/>
			<div className='flex flex-col w-full'>
				<div className='flex flex-row items-center justify-center'>
					<button className='bg-[#312d2e] duration-300 hover:bg-[#464444] text-[#dfc39b] font-medium py-2 px-4 rounded-none'>
						העתק
					</button>
					<input
						type='text'
						className='bg-neutral-200 outline-none rounded-none py-2 px-4 w-72 shadiw-lg'
						value='www.somerandomlink.co.il'
						style={{ direction: 'ltr' }}
						onClick={handleFocus}
						readOnly
					/>
				</div>
				<div className='flex flex-row justify-between mt-1'>
					<span className='font-medium'>שתף את הקישור:</span>
					<div className='flex flex-row'>
						<img
							src='https://cdn-icons-png.flaticon.com/512/124/124034.png?w=360'
							alt='whatsapp'
							className='rounded-md w-6 h-6 ml-1'
						/>
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/300px-Facebook_icon_2013.svg.png?20161223201621'
							alt='facebook'
							className='rounded-md w-6 h-6'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Results
