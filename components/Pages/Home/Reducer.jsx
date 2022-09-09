export const initialState = {
	url: '',
	password: null, // if checkbox is checked = '', if not = null
	isLoading: false,
	results: null,
}

export const ACTIONS = {
	RESET: 'RESET', // Reset to initial state
	SET_URL: 'SET_URL', // Changing the url
	ENABLE_PASSWORD: 'ENABLE_PASSWORD', // Enabling the password input
	DISABLE_PASSWORD: 'DISABLE_PASSWORD', // Disabling the password input
	SET_PASSWORD: 'SET_PASSWORD', // Setting the password
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

		case ACTIONS.ENABLE_PASSWORD: {
			return { ...state, password: '' }
		}

		case ACTIONS.DISABLE_PASSWORD: {
			return { ...state, password: null }
		}

		case ACTIONS.SET_PASSWORD: {
			return { ...state, password: action.payload }
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
			return { ...state, isLoading: false, results: action.payload }
		}

		default:
			return state
	}
}

export default Reducer
