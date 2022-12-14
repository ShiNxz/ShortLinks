export const initialState = {
	url: '',
	password: '',
	custom: '',
	notes: '',
	isLoading: false,
	results: null,
}

export const ACTIONS = {
	RESET: 'RESET', // Reset to initial state
	SET_URL: 'SET_URL', // Changing the url

	SET_PASSWORD: 'SET_PASSWORD', // Setting the password
	SET_CUSTOM: 'SET_CUSTOM', // Setting the custom code
	SET_NOTES: 'SET_NOTES', // Setting the notes

	SET_LOADING: 'SET_LOADING', // Setting the loading state
	SHORTEN_URL: 'SHORTEN_URL', // Setting the loading state
	SET_RESULTS: 'SET_RESULTS', // Setting the loading state
}

const Reducer = (state, action) => {
	switch (action.type) {
		// Reset
		case ACTIONS.RESET: {
			return { ...state, ...initialState }
		}

		// Options
		case ACTIONS.SET_URL: {
			return { ...state, url: action.payload }
		}

		case ACTIONS.SET_CUSTOM: {
			return { ...state, custom: action.payload }
		}

		case ACTIONS.SET_PASSWORD: {
			return { ...state, password: action.payload }
		}

		case ACTIONS.SET_NOTES: {
			return { ...state, notes: action.payload }
		}

		// Misc
		case ACTIONS.SET_LOADING: {
			return { ...state, isLoading: action.payload }
		}

		// Results
		case ACTIONS.SHORTEN_URL: {
			return { ...state, isLoading: true, results: null }
		}

		case ACTIONS.SET_RESULTS: {
			return { ...state, url: '', isLoading: false, results: action.payload }
		}

		default:
			return state
	}
}

export default Reducer
