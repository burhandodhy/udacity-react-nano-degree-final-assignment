import { LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/auth';

// Check local storage for user data
const storedUser = localStorage.getItem('user');

const initialState = storedUser ? JSON.parse(storedUser) : {}	;

export default function auth(state = initialState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...action.payload,
			};
		case LOGIN_ERROR:
			return {
				error: action.payload,
			};
		case 'LOG_OUT_USER':
			return {};
		default:
			return state;
	}
}
