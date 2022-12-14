import Results from '@/components/Results'
import CheckURL from '@/func/CheckURL'
import { useReducer } from 'react'
import styled from 'styled-components'
import { Title } from './Header'
import Reducer, { initialState } from './Reducer'
import { toast } from 'react-toastify'
import Axios from '@/func/Axios'
import AdvancedSettings from './AdvancedSettings'

const Button = styled.button``

const Main = ({ r }) => {
	const [state, dispatch] = useReducer(Reducer, initialState)

	const handleSubmit = async () => {
		const toastId = toast.loading('אנא המתן...', { position: toast.POSITION.TOP_RIGHT })

		if (!CheckURL(state.url))
			return toast.update(toastId, {
				render: 'הקישור אינו תקין!',
				type: toast.TYPE.WARNING,
				isLoading: false,
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

		dispatch({ type: 'SHORTEN_URL' })

		const { data, success, error } = await Axios('/api/shorten', state, 'POST')

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
			<div
				className='flex flex-col items-center container mx-auto px-8 xl:px-32 py-24'
				ref={r}
			>
				<Title>
					קצרו את <span style={{ color: 'unset' }}>הכתובת שלכם!</span>
				</Title>

				<span className='text-neutral-800 text-lg xl:text-xl mb-8'>
					מלאו את השדה בכתובת הקיימת, לחצו על הכפתור "קצר את הכתובת" ותקבלו את הכתובת המקוצרת.
				</span>

				<div className='flex flex-col lg:flex-row w-full items-center justify-center'>
					<Button
						className='bg-[#312d2e] duration-300 hover:bg-[#464444] text-[#dfc39b] font-medium py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 w-full lg:w-auto order-2 lg:order-1'
						disabled={state.isLoading}
						onClick={handleSubmit}
					>
						קצר את הכתובת
					</Button>
					<input
						type='text'
						className='bg-neutral-200 border border-neutral-300 outline-none rounded-full py-2 px-4 w-full lg:w-[28rem] order-1 lg:order-2'
						placeholder='www.'
						style={{ direction: 'ltr' }}
						onChange={(e) => dispatch({ type: 'SET_URL', payload: e.target.value })}
						disabled={state.isLoading}
						value={state.url}
					/>
				</div>

				<AdvancedSettings state={state} dispatch={dispatch} />

				<Results
					state={state}
					dispatch={dispatch}
				/>
			</div>
		</>
	)
}

export default Main
