import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Alert, Form, Button } from 'react-bootstrap';

import { handleLogInUser } from '../actions/auth';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const error = useSelector((state) => state.auth.error);

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleLogInUser(username, password));
	};

	return (
		<div>
			<h1>Login</h1>
			<Form onSubmit={handleSubmit}>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form.Group className="mb-3">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
				</Form.Group>

				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</div>
	);
};

export default Login;
