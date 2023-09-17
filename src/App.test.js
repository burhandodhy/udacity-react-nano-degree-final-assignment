import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { _saveQuestionAnswer, _saveQuestion } from './utils/_DATA';
import App from './App';
import Leaderboard from './pages/Leaderboard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const qid = 'vthrdm985a262al8qx3do';
const answer = 'optionOne';
const authedUser = 'sarahedo';

const store = {
	auth: {},
	users: {
		sarahedo: {
			id: 'sarahedo',
			password: 'password',
			name: 'Sarah Edo',
			avatarURL: 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
			answers: {
				'8xf0y6ziyjabvozdd253nd': 'optionOne',
				'6ni6ok3ym7mf1p33lnez': 'optionOne',
				am8ehyc8byjqgar0jgpub9: 'optionTwo',
				loxhs1bqm25b708cmbf3g: 'optionTwo',
			},
			questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
		},
	},
	questions: {
		'8xf0y6ziyjabvozdd253nd': {
			id: '8xf0y6ziyjabvozdd253nd',
			author: 'sarahedo',
			timestamp: 1467166872634,
			optionOne: {
				votes: [],
				text: 'Build our new application with Javascript',
			},
			optionTwo: {
				votes: [],
				text: 'Build our new application with Typescript',
			},
		},
	},
	loadingBar: loadingBarReducer,
};

const mockedStore = mockStore(store);

test('Return Login Page', () => {
	const { container } = render(
		<Provider store={mockStore(store)}>
			<App />
		</Provider>
	);
	expect(container).toMatchSnapshot();
});

test('Renders App Name', () => {
	const { getByText } = render(
		<Provider store={mockStore(store)}>
			<App />
		</Provider>
	);

	expect(getByText('Employee Polls Web App')).toBeInTheDocument();
});

test('Renders Login Page', () => {
	const { container } = render(
		<Provider store={mockStore(store)}>
			<App />
		</Provider>
	);
	const h1Element = container.querySelector('h1');

	expect(h1Element).toBeInTheDocument();
	expect(h1Element.textContent).toBe('Login');
});

describe('_saveQuestion', () => {
	const dummyQuestion = {
		optionOneText: 'Build our new application with Javascript',
		optionTwoText: 'Build our new application with Typescript',
		author: authedUser,
	};

	it('will return correct question format', async () => {
		const results = await _saveQuestion(dummyQuestion);
		expect(results.optionOne.votes.length).toEqual(0);
		expect(results.optionTwo.votes.length).toEqual(0);
		expect(results.optionOne.text).toEqual(dummyQuestion.optionOneText);
		expect(results.optionTwo.text).toEqual(dummyQuestion.optionTwoText);
	});

	it('will return error when it not has author info', async () => {
		_saveQuestion({
			...dummyQuestion,
			author: '',
		}).catch((err) => expect(err).toEqual('Please provide optionOneText, optionTwoText, and author'));
	});
});

describe('_saveQuestionAnswer', () => {
	test('Returns updated state when correct data is passed', async () => {
		const result = await _saveQuestionAnswer({ authedUser, qid, answer });

		expect(result.questions[qid].optionOne.votes).toContain(authedUser);
		expect(result.questions[qid].optionOne.votes.length).toEqual(2);
	});

	test('Returns error when data is missing', async () => {
		try {
			await _saveQuestionAnswer({ authedUser: '', qid, answer });
		} catch (error) {
			expect(error).toBe('Please provide authedUser, qid, and answer');
		}
	});
});

test('Login form returns error when incorrect credentials add', async () => {
	const { getByTestId } = render(
		<Provider store={mockedStore}>
			<App />
		</Provider>
	);

	const usernameInput = getByTestId('username');
	const passwordInput = getByTestId('password');
	const submitButton = getByTestId('submit');

	fireEvent.change(usernameInput, { target: { value: 'sarahedo' } });
	fireEvent.change(passwordInput, { target: { value: 'incorrect' } });
	fireEvent.click(submitButton);

	await waitFor(() => {
		const actions = mockedStore.getActions();
		expect(actions).toContainEqual({ type: 'LOGIN_ERROR', payload: 'Incorrect Username or Password.' });
	});
});

test('Login user can access the dashboard', () => {
	const newStore = {
		...store,
		auth: {
			id: 'sarahedo',
		},
	};

	const newMockedStore = mockStore(newStore);

	const { getByText } = render(
		<Provider store={newMockedStore}>
			<App />
		</Provider>
	);

	const newQuestionsElement = getByText('Done');

	expect(newQuestionsElement).toBeInTheDocument();
});

test('There is logout button for logged in users', () => {
	const newStore = {
		...store,
		auth: {
			id: 'sarahedo',
		},
	};

	const newMockedStore = mockStore(newStore);

	const { getByText } = render(
		<Provider store={newMockedStore}>
			<App />
		</Provider>
	);

	expect(getByText('Logout')).toBeInTheDocument();
});

test('Nav items for logged in users', () => {
	const newStore = {
		...store,
		auth: {
			id: 'sarahedo',
		},
	};

	const newMockedStore = mockStore(newStore);

	const { getByText } = render(
		<Provider store={newMockedStore}>
			<App />
		</Provider>
	);

	expect(getByText('Home')).toBeInTheDocument();
	expect(getByText('Leaderboard')).toBeInTheDocument();
	expect(getByText('New Poll')).toBeInTheDocument();
});

test('Leaderboard page', () => {
	const newStore = {
		...store,
		auth: {
			id: 'sarahedo',
		},
	};

	const newMockedStore = mockStore(newStore);

	const { container } = render(
		<Provider store={newMockedStore}>
			<Leaderboard />
		</Provider>
	);

	expect(container).toMatchSnapshot();
});
