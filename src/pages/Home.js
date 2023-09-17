import { useState } from 'react';
import { Row, Tab, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import QuestionCard from '../components/QuestionCard';

const Home = () => {
	const [activeTab, setActiveTab] = useState('unanswered');
	const authedUser = useSelector((state) => state.auth);
	const user = useSelector((state) => state.users[authedUser.id]);
	const questions = useSelector((state) => state.questions);

	const handleTabChange = (eventKey) => {
		setActiveTab(eventKey);
	};

	const questionsArray = Object.values(questions);
	questionsArray.sort((a, b) => b.timestamp - a.timestamp);

	const answeredQuestions = questionsArray.filter((question) => Object.keys(user.answers).includes(question.id));
	const newQuestions = questionsArray.filter((question) => !Object.keys(user.answers).includes(question.id));

	const renderQuestions = (questionList, title) => {
		return (
			<>
				{questionList.length > 0 && (
					<div className="mt-4">
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
		<Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
			<Nav variant="tabs">
				<Nav.Item>
					<Nav.Link eventKey="unanswered">Unanswered</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="answered">Answered</Nav.Link>
				</Nav.Item>
			</Nav>
			<Tab.Content>
				<Tab.Pane eventKey="unanswered">{renderQuestions(newQuestions, 'New Questions')}</Tab.Pane>
				<Tab.Pane eventKey="answered">{renderQuestions(answeredQuestions, 'Done')}</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
};

export default Home;
