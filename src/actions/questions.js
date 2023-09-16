import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';
import { saveUserAnswer } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

export function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}

export function handleAddQuestion(optionOneText, optionTwoText) {
	return (dispatch, getState) => {
		const { auth } = getState();
		const question = {
			optionOneText,
			optionTwoText,
			author: auth.id,
		};

		_saveQuestion(question)
			.then((question) => {
				dispatch(addQuestion(question));
			})
			.catch((e) => {
				console.warn('Error in handleAddQuestion: ', e);
			});
	};
}

export function saveQuestionAnswer(authedUser, qid, answer) {
	return {
		type: SAVE_QUESTION_ANSWER,
		authedUser,
		qid,
		answer,
	};
}

export function handleSaveQuestionAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { auth } = getState();
		dispatch(saveQuestionAnswer(auth.id, qid, answer));
		dispatch(saveUserAnswer(auth.id, qid, answer));
	};
}
