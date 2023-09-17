import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';

import users from '../reducers/users';
import questions from '../reducers/questions';
import auth from '../reducers/auth';
import middleware from '../middleware';

export const store = configureStore({
	reducer: {
		users,
		questions,
		auth,
		loadingBar: loadingBarReducer,
	},
	middleware,
});
