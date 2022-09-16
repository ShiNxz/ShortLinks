import { createSlice } from '@reduxjs/toolkit'

const initialModals = {
	// Types: 'login', 'register', 'reset', 'confirm'
	login: false,
	register: false,
	forgotPassword: false,
}

const initialState = {
	modals: initialModals,
	_: 'sdgsd',
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.modals = { ...initialModals, [action.payload]: true }
		},
		closeModal: (state) => {
			state.modals = initialModals
		},
	},
})

export const { openModal, closeModal } = authSlice.actions

export default authSlice.reducer
