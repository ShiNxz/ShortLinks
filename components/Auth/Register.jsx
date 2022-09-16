import Input from '@/UI/Next/Input'
import Checkbox from '@/UI/Next/Checkbox'
import { FiMail } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Text, Row, Spacer } from '@nextui-org/react'
import paymentReducer, { initialState, ACTIONS, Link } from './Reducer'
import { useReducer } from 'react'
import Button from '@/UI/Next/Button'
import { toast } from 'react-toastify'
import Axios from '@/utils/functions/Axios'
import cookie from 'js-cookie'
import useAuth from '@/utils/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { closeModal, openModal } from '@/utils/slices/authSlice'

const RegisterComponent = ({ size }) => {
	const [state, dispatch] = useReducer(paymentReducer, initialState)
	const dispatchRedux = useDispatch()

	const { mutate, loggedIn } = useAuth()

	const inputs = [
		{
			id: 'username',
			placeholder: 'שם משתמש',
			icon: <FiMail />,
			type: 'text',
			onChange: (e) => dispatch({ type: ACTIONS.SET_USERNAME, payload: e.target.value }),
			success: '✓ שם המשתמש תקין',
		},
		{
			id: 'email',
			placeholder: 'כתובת אימייל',
			icon: <FiMail />,
			type: 'email',
			onChange: (e) => dispatch({ type: ACTIONS.SET_EMAIL, payload: e.target.value }),
			success: '✓ האימייל תקין',
		},
		{
			id: 'password',
			placeholder: 'סיסמה',
			icon: <RiLockPasswordLine />,
			type: 'password',
			onChange: (e) => dispatch({ type: ACTIONS.SET_PASSWORD, payload: e.target.value }),
			success: '✓ הסיסמה תקינה',
		},
	]

	const submitForm = async () => {
		// checks
		if (state.username.status !== 1 || state.email.status !== 1 || state.password.status !== 1)
			return toast.error('אחד או יותר מהתיבות אינו תקין', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

		if (!state.tos)
			return toast.error('יש לאשר את תנאי השימוש על מנת להרשם!', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

		dispatch({ type: ACTIONS.SET_LOADING, payload: true })

		const { success, error, data } = await Axios('/api/auth/register', state, 'POST')

		if (!success) {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false })

			return toast.error(error, {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
		}

		toast.success('נרשמת בהצלחה!', {
			autoClose: 3000,
			closeButton: true,
			closeOnClick: true,
		})

		setTimeout(() => {
			cookie.set('token', data.token, { expires: 30 })
			mutate()
			dispatchRedux(closeModal())
		}, 1200)
	}

	return !loggedIn ? (
		<>
			{inputs.map(({ id, placeholder, icon, type, onChange, value, success }) => (
				<>
					<Input
						key={id}
						clearable={false}
						id={id}
						bordered
						fullWidth
						value={state[id]?.value}
						color='primary'
						size='lg'
						placeholder={placeholder}
						contentLeft={icon}
						type={type}
						onChange={onChange}
						error={state[id]?.error || undefined}
						success={state[id]?.status === 1 ? success : undefined}
						loading={state.loading || undefined}
					/>
					<Spacer y={0.1} key={id} />
				</>
			))}

			<Row justify='space-between'>
				<div className='flex flex-col'>
					<Checkbox
						isSelected={state.adverts}
						color='primary'
						onChange={(payload) => dispatch({ type: ACTIONS.SET_ADVERTS, payload })}
					>
						<Text size={14}>אני מעוניין להרשם לעדכונים</Text>
					</Checkbox>
					<Checkbox
						color='success'
						isSelected={state.tos}
						onChange={(payload) => dispatch({ type: ACTIONS.SET_TOS, payload })}
					>
						<Text size={14}>אני מאשר את תנאי השימוש</Text>
					</Checkbox>
				</div>
				<Link className='hover:text-blue-600' onClick={() => dispatchRedux(openModal('login'))}>יש ברשותי כבר משתמש</Link>
			</Row>

			<Button
				auto
				flat
				color='primary'
				onClick={submitForm}
				loading={state.loading || undefined}
			>
				הרשם
			</Button>
			<Spacer y={0} />
		</>
	) : (
		<></>
	)
}

export default RegisterComponent
