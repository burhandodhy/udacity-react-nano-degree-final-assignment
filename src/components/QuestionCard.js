import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const QuestionCard = (props) => {
	const { id, author, timestamp } = props;
	const date = new Date(timestamp).toLocaleString('en-US');
	return (
		<Col md={4} className="mb-4">
			<Card>
				<Card.Body>
					<Card.Title>{author}</Card.Title>
					<Card.Text>{date}</Card.Text>
					<Link to={`/questions/${id}`} className="btn btn-primary"> Show </Link>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default QuestionCard;
