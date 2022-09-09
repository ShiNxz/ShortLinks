import Results from '@/components/Results'
import CheckURL from '@/func/CheckURL'
import { useReducer } from 'react'
import styled from 'styled-components'
import { Title } from './Header'
import Reducer, { initialState } from './Reducer'
import { toast } from 'react-toastify'
import Axios from '@/func/Axios'

const Button = styled.button``

const Main = () => {
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

		const { data, success } = await Axios('/api/shorten', state, 'POST')

		dispatch({ type: 'SET_RESULTS', payload: data })
		return toast.update(toastId, {
			render: success ? 'הקישור קוצר בהצלחה!' : `חלה שגיאה! ${data.error}`,
			type: success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
			isLoading: false,
			autoClose: 5000,
			closeButton: true,
			closeOnClick: true,
		})
	}

	return (
		<div className=''>
			<div className='flex flex-col items-center container mx-auto px-32 py-24'>
				<Title>
					קצרו את <span style={{ color: 'unset' }}>הכתובת שלכם!</span>
				</Title>

				<span className='text-neutral-800 text-xl mb-8'>
					מלאו את השדה בכתובת הקיימת, לחצו על הכפתור "קצר את הכתובת" ותקבלו את הכתובת המקוצרת.
				</span>

				<div className='flex flex-row w-full items-center justify-center'>
					<Button
						className='bg-[#312d2e] duration-300 hover:bg-[#464444] text-[#dfc39b] font-medium py-2 px-4 rounded-full ml-4'
						disabled={state.isLoading}
						onClick={handleSubmit}
					>
						קצר את הכתובת
					</Button>
					<input
						type='text'
						className='bg-neutral-200 border border-neutral-300 outline-none rounded-full py-2 px-4 w-96'
						placeholder='www.'
						style={{ direction: 'ltr' }}
						onChange={(e) => dispatch({ type: 'SET_URL', payload: e.target.value })}
						disabled={state.isLoading}
					/>
				</div>

				{/* <AdvancedSettings /> */}

				<Results
					state={state}
					dispatch={dispatch}
				/>
			</div>
		</div>
	)
}

export default Main
