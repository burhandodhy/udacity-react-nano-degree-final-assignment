import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import QuestionCard from './QuestionCard';

const Home = () => {
	const authedUser = useSelector((state) => state.auth);
	const user = useSelector((state) => state.users[authedUser.id]);

	const questions = useSelector((state) => state.questions);

	const questionsArray = Object.values(questions);
	questionsArray.sort((a, b) => b.timestamp - a.timestamp);

	const answeredQuestions = questionsArray.filter((question) => Object.keys(user.answers).includes(question.id));
	const newQuestions = questionsArray.filter((question) => !Object.keys(user.answers).includes(question.id));

	return (
		<>
			<div>
				<h2>New Questions</h2>
				<Row className="mt-4">
					{newQuestions.map((question) => {
						const { id, author, timestamp } = question;
						return <QuestionCard key={id} id={id} author={author} timestamp={timestamp} />;
					})}
				</Row>
			</div>

			<div>
				<h2>Done</h2>
				<Row className="mt-4">
					{answeredQuestions.map((question) => {
						const { id, author, timestamp } = question;
						return <QuestionCard key={id} id={id} author={author} timestamp={timestamp} />;
					})}
				</Row>
			</div>
		</>
	);
};

export default Home;
