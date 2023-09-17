import { Navbar, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleLogOutUser } from '../actions/auth';

const HeaderNavbar = () => {
	const user = useSelector((state) => state.auth);
	const isAuthenticated = user.id;
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(handleLogOutUser());
	};

	return (
		<Navbar bg="light" expand="lg">
			<Link to="/" className="navbar-brand">
				Employee Polls Web App
			</Link>
			{isAuthenticated ? (
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link to="/" className="nav-link">
							Home
						</Link>
						<Link to="/leaderboard" className="nav-link">
							Leaderboard
						</Link>
						<Link to="/add" className="nav-link">
							New Poll
						</Link>
					</Nav>
					<Navbar.Collapse className="justify-content-end">
						<Nav>
							<div className="d-flex align-items-center">
								<span className="mr-3">Logged in as {user.name}</span>
								<img src={user.avatarURL} alt="User Avatar" className="avatar-img" />
								<Button variant="outline-primary" onClick={handleLogout}>
									Logout
								</Button>
							</div>
						</Nav>
					</Navbar.Collapse>
				</Navbar.Collapse>
			) : null}
		</Navbar>
	);
};

export default HeaderNavbar;
