export const initialState = {
	phone: {
		number: '',
		code: '+972',
	},
	message: '',
	isLoading: false,
	results: null,
}

export const ACTIONS = {
	RESET: 'RESET', // Reset to initial state

	SET_PHONE: 'SET_PHONE',
	SET_PHONECODE: 'SET_PHONECODE',
	SET_MESSAGE: 'SET_MESSAGE',

	SET_LOADING: 'SET_LOADING', // Setting the loading state
	SET_RESULTS: 'SET_RESULTS', // Setting the loading state
}

const Reducer = (state, action) => {
	switch (action.type) {
		// Reset
		case ACTIONS.RESET: {
			return { ...state, ...initialState }
		}

		// Options
		case ACTIONS.SET_PHONE: {
			return { ...state, phone: { ...state.phone, number: action.payload } }
		}

		case ACTIONS.SET_PHONECODE: {
			return { ...state, phone: { ...state.phone, code: action.payload } }
		}

		case ACTIONS.SET_MESSAGE: {
			return { ...state, message: action.payload }
		}

		// Misc
		case ACTIONS.SET_LOADING: {
			return { ...state, isLoading: action.payload }
		}

		// Results
		case ACTIONS.SET_RESULTS: {
			return { ...state, url: '', isLoading: false, results: action.payload }
		}

		default:
			return state
	}
}

export default Reducer
