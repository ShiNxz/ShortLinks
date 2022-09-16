import { closeModal, openModal } from '@/utils/slices/authSlice'
import { Modal, Text } from '@nextui-org/react'

import { useSelector, useDispatch } from 'react-redux'
import LoginComponent from './Login'
import RegisterComponent from './Register'

const AuthModal = () => {
	const authModal = useSelector((state) => state.auth.modals)
	const dispatch = useDispatch()

	const types = {
		login: {
			title: 'התחברות',
			subtitle: 'התחברות לחשבון',
			component: LoginComponent,
		},
		register: {
			title: 'הרשמה',
			subtitle: 'הרשמה ופתיחת משתמש',
			component: RegisterComponent,
		},
	}

	let type =
		types[
			authModal.login
				? 'login'
				: authModal.register
				? 'register'
				: authModal.forgotPassword
				? 'forgotPassword'
				: null
		]

	return (
		<Modal
			closeButton
			aria-labelledby='Auth Modal'
			open={typeof type !== 'undefined'}
			onClose={() => dispatch(closeModal())}
		>
			<Modal.Header>
				<div className='flex flex-col'>
					<Text
						id='modal-title'
						size={22}
					>
						{type?.title}
					</Text>
					<Text
						id='modal-subtitle'
						size={14}
					>
						{type?.subtitle}
					</Text>
				</div>
			</Modal.Header>
			<Modal.Body>{type && <type.component />}</Modal.Body>
		</Modal>
	)
}

export default AuthModal
