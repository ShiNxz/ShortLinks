import ReactLoading from 'react-loading'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'react-toastify'

const Results = ({ state }) => {
	const handleFocus = (event) => event.target.select()

	const handleCopy = async () => {
		await navigator.clipboard.writeText(state.results.shortUrl || '')
		console.log(state.results.shortUrl || '')
		return toast.success('הקישור הועתק', {
			autoClose: 3000,
			closeButton: true,
			closeOnClick: true,
		})
	}

	return (
		<div className={`mt-10 h-32 mb-8 w-full ${!state.isLoading && !state.results && 'animate-pulse bg-neutral-700/5'}`}>
			<AnimatePresence>
				{state.isLoading ? (
					<motion.div
						key='loading circle'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.3 } }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='w-full h-full'
					>
						<ReactLoading
							type='spinningBubbles'
							color='#312d2e'
							//height='20%'
							//width='20%'
							className='mx-auto'
						/>
					</motion.div>
				) : (
					state.results && (
						<motion.div
							key='results container'
							initial={{
								y: 20,
								opacity: 0,
								animationDelay: 3.5,
								transitionDelay: 3.5,
							}}
							animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
							exit={{ y: 20, opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className='flex flex-col w-fit mx-auto'>
								<div className='flex flex-row items-center justify-center'>
									<button
										className='bg-[#312d2e] duration-300 hover:bg-[#464444] text-[#dfc39b] font-medium py-2 px-4 rounded-none'
										onClick={handleCopy}
									>
										העתק
									</button>
									<input
										type='text'
										className='bg-neutral-200 outline-none rounded-none py-2 px-4 w-full lg:w-72 shadiw-lg'
										value={state.results.shortUrl}
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
						</motion.div>
					)
				)}
			</AnimatePresence>
		</div>
	)
}

export default Results
