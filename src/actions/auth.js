export const LOG_IN_USER = 'LOG_IN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOG_OUT_USER = 'LOG_OUT_USER';

// Action creator
export function logInUser(user) {
	return {
		type: LOGIN_SUCCESS,
		payload: user,
	};
}

export function logInError(message) {
	return {
		type: LOGIN_ERROR,
		payload: message,
	};
}

export function logOutUser() {
	return {
		type: LOG_OUT_USER,
	};
}

// Async Action creator
export function handleLogInUser(username, password) {
	return (dispatch, getState) => {
		const { users } = getState();
		const user = Object.values(users).find((user) => user.id === username);
		if (user && user.password === password) {
			dispatch(logInUser(user));
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			dispatch(logInError('Incorrect Username or Password.'));
		}
	};
}

export function handleLogOutUser() {
	return (dispatch) => {
		localStorage.removeItem('user');
		dispatch(logOutUser());
	};
}
