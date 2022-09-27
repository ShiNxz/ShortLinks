import { Button, Input, Spacer } from '@nextui-org/react'
import { useState } from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { ACTIONS } from './Reducer'

const AdvancedSettings = ({ state, dispatch }) => {
	const [show, setShow] = useState(false)

	return (
		<div className='mt-4 px-32 text-center flex items-center flex-col w-full'>
			<Button
				light
				color='primary'
				auto
				onClick={() => setShow(!show)}
				className='mb-2'
			>
				הגדרות מתקדמות
				<AiOutlineArrowDown className={`${show ? 'rotate-180' : 'rotate-0'} mr-2 duration-300 ease-in-out`} />
			</Button>
			<div
				className={`bg-neutral-100 w-full h-full overflow-hidden duration-300 rouned-xl ${
					show ? 'max-h-96' : 'max-h-0'
				}`}
			>
				<div className='p-4'>
					<h4>הגדרות מתקדמות</h4>
					<Spacer y={2} />
					<Input
						underlined
						labelPlaceholder='סיסמה'
						className='!w-72'
						autoComplete='off'
						id='urlPassword'
						onChange={(e) => dispatch({ type: ACTIONS.SET_PASSWORD, payload: e.target.value })}
						disabled={state.isLoading}
						value={state.password}
					/>
					<p className='text-xs my-1'>קוד אבטחה לקישור כאשר נכנסים אליו</p>
					<Spacer y={2} />
					<Input
						underlined
						labelLeft={process.env.BASE_URI.replace('http://', '').replace('https://', '') + '/'}
						labelPlaceholder='קישור מותאם'
						style={{}}
						autoComplete='off'
						id='customCode'
						onChange={(e) => dispatch({ type: ACTIONS.SET_CUSTOM, payload: e.target.value })}
						disabled={state.isLoading}
						value={state.custom}
					/>
					<Spacer y={2} />
					<Input
						underlined
						labelPlaceholder='הערות'
						className='!w-72'
						autoComplete='off'
						id='urlNotes'
						onChange={(e) => dispatch({ type: ACTIONS.SET_NOTES, payload: e.target.value })}
						disabled={state.isLoading}
						value={state.notes}
					/>
					<p className='text-xs my-1'>ניתן לצפות ולערוך את הערות בפאנל הקישורים</p>
				</div>
			</div>
		</div>
	)
}

export default AdvancedSettings
