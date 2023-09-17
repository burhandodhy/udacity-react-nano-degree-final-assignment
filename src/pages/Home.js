import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import QuestionCard from '../components/QuestionCard';

const Home = () => {
	const authedUser = useSelector((state) => state.auth);
	const user = useSelector((state) => state.users[authedUser.id]);
	const questions = useSelector((state) => state.questions);

	const questionsArray = Object.values(questions);
	questionsArray.sort((a, b) => b.timestamp - a.timestamp);

	const answeredQuestions = questionsArray.filter((question) => Object.keys(user.answers).includes(question.id));
	const newQuestions = questionsArray.filter((question) => !Object.keys(user.answers).includes(question.id));

	const renderQuestions = (questionList, title) => {
		return (
			<>
				{questionList.length > 0 && (
					<div>
						<h2>{title}</h2>
						<Row className="mt-4">
							{questionList.map((question) => (
								<QuestionCard key={question.id} id={question.id} author={question.author} timestamp={question.timestamp} />
							))}
						</Row>
					</div>
				)}
			</>
		);
	};

	return (
		<>
			{renderQuestions(newQuestions, 'New Questions')}
			{renderQuestions(answeredQuestions, 'Done')}
		</>
	);
};

export default Home;
