import styled from 'styled-components'
import { isEmail, isStrongPassword, matches } from 'validator'

export const initialState = {
	username: { value: '', status: -1, error: false },
	email: { value: '', status: -1, error: false },
	password: { value: '', status: -1, error: false },
	verify_password: { value: '', status: -1, error: false },

	identifier: { value: '', status: -1, error: false },

	loading: false,
	error: null,
	tos: false,
	adverts: true,

	rememberMe: true,
}

export const ACTIONS = {
	SET_USERNAME: 'SET_USERNAME',

	SET_EMAIL: 'SET_EMAIL',

	SET_IDENTIFIER: 'SET_IDENTIFIER',

	SET_PASSWORD: 'SET_PASSWORD',

	SET_LOADING: 'SET_LOADING',
	SET_ERROR: 'SET_ERROR',

	SET_TOS: 'SET_TOS',
	SET_ADVERTS: 'SET_ADVERTS',

	SET_REMEMBER_ME: 'SET_REMEMBER_ME',
}

const Reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_EMAIL: {
			const checkEmail = isEmail(action.payload)

			if (state.username.status === -1) {
				if (checkEmail) {
					const username = action.payload.split('@')[0].trim()

					const checkUsername =
						action.payload.length > 4 &&
						action.payload.length < 15 &&
						matches(username, '^[a-zA-Z0-9_.-]*$')

					state.username = {
						value: action.payload.split('@')[0],
						status: checkUsername ? 1 : 0,
						error: checkUsername ? null : 'שם המשתמש אינו תקין!',
					}
				}
			}

			return {
				...state,
				email: {
					value: action.payload,
					status: checkEmail ? 1 : 0,
					error: checkEmail ? null : 'האימייל אינו תקין!',
				},
			}
		}

		case ACTIONS.SET_USERNAME: {
			const username = action.payload.trim()

			const checkUsername =
				action.payload.length > 4 && action.payload.length < 15 && matches(username, '^[a-zA-Z0-9_.-]*$')

			return {
				...state,
				username: {
					value: action.payload,
					status: checkUsername ? 1 : 0,
					error: checkUsername ? null : 'שם המשתמש אינו תקין!',
				},
			}
		}

		case ACTIONS.SET_IDENTIFIER: {
			const username = action.payload.trim()

			const checkUsername = action.payload.length > 4 && matches(username, '^[a-zA-Z0-9_.-]*$')

			return {
				...state,
				identifier: {
					value: action.payload,
					status: checkUsername ? 1 : 0,
					error: checkUsername ? null : 'שם המשתמש או האימייל אינו תקין!',
				},
			}
		}

		case ACTIONS.SET_PASSWORD: {
			const password = isStrongPassword(action.payload, {
				minLength: 6,
				maxLength: 24,
				minLowercase: 1,
				minUppercase: 0,
				minNumbers: 1,
				minSymbols: 0,
			})

			return {
				...state,
				password: {
					value: action.payload,
					status: password ? 1 : 0,
					error: password ? null : 'הסיסמה אינה חזקה מספיק!',
				},
			}
		}

		case ACTIONS.SET_TOS: {
			return {
				...state,
				tos: action.payload,
			}
		}

		case ACTIONS.SET_ADVERTS: {
			return {
				...state,
				adverts: action.payload,
			}
		}

		case ACTIONS.SET_REMEMBER_ME: {
			return {
				...state,
				rememberMe: action.payload,
			}
		}

		case ACTIONS.SET_LOADING: {
			return {
				...state,
				loading: action.payload,
			}
		}

		default:
			return state
	}
}

export const Link = styled.a`
	text-decoration: none;
	transition: all 0.3s ease;
	cursor: pointer;
	font-size: 0.8rem;

	&::after {
		display: block;
		content: '';
		border-bottom: solid 2px #6e97f1;
		transform: scaleX(0);
		transition: transform 250ms ease-in-out;
	}

	&:hover::after {
		transform: scaleX(1);
	}
`

export default Reducer
