import { Button, Input, Spacer, Dropdown } from '@nextui-org/react'
import Results from '@/components/Results'
import { useReducer } from 'react'
import Reducer, { ACTIONS, initialState } from './Reducer'
import { toast } from 'react-toastify'
import Axios from '@/func/Axios'
import codes from './codes.json'
import styled from 'styled-components'

const Title = styled.h3`
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
`

const WhatsApp = () => {
	const [state, dispatch] = useReducer(Reducer, initialState)

	const handleSubmit = async () => {
		if (state.phone.number === '' && state.message === '')
			return toast.error('יש למלא את הטקסט או הטלפון!', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

		if (state.phone.number !== '' && state.phone.number.length < 8)
			return toast.error('מספר הטלפון שהוקש אינו תקין!', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

		const toastId = toast.loading('אנא המתן...', { position: toast.POSITION.TOP_RIGHT })

		const madeUrl = `https://wa.me/${state.phone.number !== '' ? `${state.phone.code}${state.phone.number}` : ''}?${
			state.message !== '' ? `text=${state.message}` : ''
		}`

		const { data, success, error } = await Axios('/api/shorten', { url: madeUrl }, 'POST')

		dispatch({ type: 'SET_RESULTS', payload: data })

		return toast.update(toastId, {
			render: success ? 'הקישור קוצר בהצלחה!' : `חלה שגיאה! ${error}`,
			type: success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
			isLoading: false,
			autoClose: 5000,
			closeButton: true,
			closeOnClick: true,
		})
	}

	return (
		<>
			<div className='flex flex-col items-center container mx-auto px-8 xl:px-32 py-16'>
				<Title className='!text-xl sm:!text-2xl lg:!text-3xl xl:!text-4xl'>
					קיצור קישור <span style={{ color: 'unset' }}>WhatsApp</span> בקלות!
				</Title>

				<p className='text-neutral-800 text-sm mb-8 md:text-md lg:text-lg'>
					מלאו את השדה בכתובת הקיימת, לחצו על הכפתור "קצר את הכתובת" ותקבלו את הכתובת המקוצרת.
					<br />
					• במידה ותציינו מספר טלפון, תקבלו קישור שמעביר אתכם באופן אוטומטי לצאט עם מספר הטלפון.
					<br />
					• במידה ותציינו מספר טלפון והודעה, תקבלו קישור שמעביר אתכם לצאט עם מספר הטלפון והודעה כתובה מראש.
					<br />• במידה ותציינו רק הודעה, תקבלו קישור שמעביר אתכם לאפליקצייה עם הודעה מוכנה, ורק נשאר לכם
					לבחור צאט.
				</p>

				<div className='flex flex-col items-center justify-center'>
					<Spacer y={1} />
					<Input
						underlined
						labelLeft={
							<Dropdown>
								<Dropdown.Button
									color='primary'
									light
									size='xs'
								>
									{state.phone.code}
								</Dropdown.Button>
								<Dropdown.Menu
									color='primary'
									variant='light'
									aria-label='Actions'
									onAction={(e) => dispatch({ type: ACTIONS.SET_PHONECODE, payload: e })}
									borderWeight={0}
								>
									{codes.map(({ name, dial_code }) => (
										<Dropdown.Item key={dial_code}>
											{name}: {dial_code}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						}
						labelPlaceholder='מספר טלפון'
						autoComplete='off'
						onChange={(e) => dispatch({ type: ACTIONS.SET_PHONE, payload: e.target.value })}
						disabled={state.isLoading}
						value={state.phone.number}
						style={{ direction: 'ltr' }}
					/>
					<Spacer y={1} />
					<label
						htmlFor='message'
						className='text-neutral-800 text-sm'
					>
						הודעה מוכנה - לא חובה
					</label>
					<textarea
						type='text'
						className='bg-neutral-200 border border-neutral-300 outline-none rounded-md py-2 px-4 w-full lg:w-[28rem]'
						placeholder='הודעה...'
						onChange={(e) => dispatch({ type: ACTIONS.SET_MESSAGE, payload: e.target.value })}
						disabled={state.isLoading}
						value={state.message}
						id='message'
					/>
					<Spacer y={1} />
					{/* <Button
						//className='bg-[#312d2e] duration-300 hover:bg-[#464444] text-[#dfc39b] font-medium py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 w-full lg:w-auto'
						disabled={state.isLoading}
						onClick={handleSubmit}
						color='warning'
					>
						צור קישור
					</Button> */}
					<button
						className='bg-[#312d2e] duration-300 hover:bg-[#464444] text-[#dfc39b] font-medium py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 w-full lg:w-auto'
						disabled={state.isLoading}
						onClick={handleSubmit}
						//color='warning'
					>
						צור קישור
					</button>
					<Spacer y={1} />
				</div>

				<Results
					state={state}
					dispatch={dispatch}
				/>
			</div>
		</>
	)
}

export default WhatsApp
