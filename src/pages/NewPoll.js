import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

import { Row, Col, Form, Button } from 'react-bootstrap';

import { handleAddQuestion } from '../actions/questions';

const NewPoll = ( props ) => {
	const [firstOption, setFirstOption] = useState('');
	const [secondOption, setSecondOption] = useState('');
	const navigate = useNavigate();

	const handleFirstOptionChange = (e) => {
		setFirstOption(e.target.value);
	};

	const handleSecondOptionChange = (e) => {
		setSecondOption(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.dispatch(handleAddQuestion(firstOption, secondOption));
		navigate('/');
	};

	return (
		<>
			<Row>
				<Col className="text-center">
					<h1>Would You Rather</h1>
					<h4>Create Your Own Poll</h4>
				</Col>
			</Row>

			<Row className="mt-4">
				<Col className="text-center">
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="firstOption" className="mb-3">
							<Form.Label>First Option</Form.Label>
							<Form.Control type="text" placeholder="Enter your first option" value={firstOption} onChange={handleFirstOptionChange} required />
						</Form.Group>

						<Form.Group controlId="secondOption" className="mb-3">
							<Form.Label>Second Option</Form.Label>
							<Form.Control type="text" placeholder="Enter your second option" value={secondOption} onChange={handleSecondOptionChange} required />
						</Form.Group>

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	);
};

export default connect()(NewPoll);
