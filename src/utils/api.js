import { _getUsers, _getQuestions } from './_DATA';

const getInitialData = () => {
	return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({
		users,
		questions,
	}));
};




export { getInitialData }
