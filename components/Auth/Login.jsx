import Input from '@/UI/Next/Input'
import Checkbox from '@/UI/Next/Checkbox'
import { FiMail } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Text, Row, Spacer, Popover } from '@nextui-org/react'
import paymentReducer, { initialState, ACTIONS } from './Reducer'
import { useReducer } from 'react'
import Button from '@/UI/Next/Button'
import { toast } from 'react-toastify'
import Axios from '@/utils/functions/Axios'
import cookie from 'js-cookie'
import useAuth from '@/utils/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { closeModal, openModal } from '@/utils/slices/authSlice'

const LoginComponent = ({ size }) => {
	const [state, dispatch] = useReducer(paymentReducer, initialState)
	const dispatchRedux = useDispatch()

	const { mutate, loggedIn } = useAuth()

	const inputs = [
		{
			id: 'identifier',
			placeholder: 'שם משתמש או כתובת אימייל',
			icon: <FiMail />,
			type: 'text',
			onChange: (e) => dispatch({ type: ACTIONS.SET_IDENTIFIER, payload: e.target.value }),
			success: '✓ שם המשתמש/כתובת האימייל תקינה',
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
		if (state.identifier.status !== 1 || state.password.status !== 1)
			return toast.error('אחד או יותר מהתיבות אינו תקין', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})

		dispatch({ type: ACTIONS.SET_LOADING, payload: true })

		const { success, error, data } = await Axios('/api/auth/login', state, 'POST')

		if (!success) {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false })

			return toast.error(error, {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
		}

		toast.success('התחברת בהצלחה!', {
			autoClose: 3000,
			closeButton: true,
			closeOnClick: true,
		})

		setTimeout(() => {
			cookie.set('token', data.token, { expires: state.rememberMe ? 30 : 1 })
			mutate()
			dispatchRedux(closeModal())
		}, 2000)
	}

	return !loggedIn ? (
		<>
			{inputs.map(({ id, placeholder, icon, type, onChange, success }) => (
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
					<Spacer y={0.1} />
				</>
			))}

			<Row justify='space-between'>
				<Checkbox
					color='success'
					isSelected={state.rememberMe}
					onChange={(payload) => dispatch({ type: ACTIONS.SET_REMEMBER_ME, payload })}
				>
					<Text size={14}>
						זכור אותי?
						<Popover
							isBordered
							disableShadow
						>
							<Popover.Trigger>
								<a className='mr-1'>(לחץ למידע נוסף)</a>
							</Popover.Trigger>
							<Popover.Content className='py-2 px-4'>
								<Text>במידה ותרצו שהמשתמש ישאר מחובר למשך 30 ימים</Text>
							</Popover.Content>
						</Popover>
					</Text>
				</Checkbox>
				<Text size={14}>שכחתי סיסמה? (לא זמין)</Text>
			</Row>

			<Button
				auto
				flat
				color='secondary'
				onClick={submitForm}
				loading={state.loading || undefined}
			>
				התחבר
			</Button>
			<Spacer y={0} />
		</>
	) : (
		<></>
	)
}

export default LoginComponent
