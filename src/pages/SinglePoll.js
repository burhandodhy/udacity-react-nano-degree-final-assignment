import { Row, Col, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { saveQuestionAnswer } from '../actions/questions';
import { saveUserAnswer } from '../actions/users';

const SinglePoll = (props) => {
	const { id } = useParams();
	const questions = useSelector((state) => state.questions);
	const users = useSelector((state) => state.users);
	const user = useSelector((state) => state.auth);

	const question = questions[id];
	const dispatch = useDispatch();

	if (!question) {
		return <h1>404 - Question Not Found</h1>;
	}

	const author = users[question.author];

	const totalUsers = Object.keys(users).length;
	const totalVotesOptionOne = question.optionOne.votes.length;
	const totalVotesOptionTwo = question.optionTwo.votes.length;
	const percentageOptionOne = ((totalVotesOptionOne / totalUsers) * 100).toFixed(2);
	const percentageOptionTwo = ((totalVotesOptionTwo / totalUsers) * 100).toFixed(2);

	const isAnswered = users[user.id].answers[id];

	const handleVote = (e) => {
		e.preventDefault();
		const answer = e.target.value;
		const qid = id;

		dispatch(saveQuestionAnswer(user.id, qid, answer));
		dispatch(saveUserAnswer(user.id, qid, answer));
	};

	return (
		<>
			<Row>
				<Col className="text-center">
					<h1>Poll By {question.author}</h1>
				</Col>
			</Row>

			<Row className="mt-4">
				<Col md={{ span: 4, offset: 4 }} className="text-center">
					<Image src={author.avatarURL} alt="User Avatar" roundedCircle style={{ maxWidth: '200px' }} />
				</Col>
			</Row>

			<Row className="mt-4">
				<Col className="text-center">
					<h2>Would You Rather</h2>
				</Col>
			</Row>

			<Row className="mt-4">
				<Col md={6} className="text-center">
					<p>{question.optionOne.text}</p>
					<Button variant="primary" className="mb-3" disabled={isAnswered} value="optionOne" onClick={handleVote}>
						{isAnswered === 'optionOne' ? 'Voted' : 'Click'}
					</Button>
					<p className="font-weight-bold">
						Total Votes: <span className="text-primary">{totalVotesOptionOne}</span>
					</p>
					<p className="font-weight-bold">
						Percentage: <span className="text-success">{percentageOptionOne}%</span>
					</p>
				</Col>
				<Col md={6} className="text-center">
					<p>{question.optionTwo.text}</p>
					<Button variant="primary" className="mb-3" disabled={isAnswered} value="optionTwo" onClick={handleVote}>
						{isAnswered === 'optionTwo' ? 'Voted' : 'Click'}
					</Button>
					<p className="font-weight-bold">
						Total Votes: <span className="text-primary">{totalVotesOptionTwo}</span>
					</p>
					<p className="font-weight-bold">
						Percentage: <span className="text-success">{percentageOptionTwo}%</span>
					</p>
				</Col>
			</Row>
		</>
	);
};

export default SinglePoll;
