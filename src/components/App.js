import { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { handleInitialData } from './../actions/shared';

import { Container } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HeaderNavbar from './HeaderNavbar';
import Login from '../pages/Login';
import Home from '../pages/Home';
import SinglePoll from '../pages/SinglePoll';
import NewPoll from '../pages/NewPoll';
import Leaderboard from '../pages/Leaderboard';

import LoadingBar from 'react-redux-loading-bar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';

function App({ dispatch, loading }) {
	const user = useSelector((state) => state.auth);
	const isAuthenticated = user.id;

	useEffect(() => {
		dispatch(handleInitialData());
	}, []);

	return (
		<>
			<LoadingBar />
			<Router>
				<HeaderNavbar />
				<Container className="mt-5">
					{loading === true ? null : (
						<Routes>
							<Route path="/" exact element={!isAuthenticated ? <Login /> : <Home />} />
							<Route path="/questions/:id" element={!isAuthenticated ? <Login /> : <SinglePoll />} />
							<Route path="/add" element={!isAuthenticated ? <Login /> : <NewPoll />} />
							<Route path="/leaderboard" element={!isAuthenticated ? <Login /> : <Leaderboard />} />
						</Routes>
					)}
				</Container>
			</Router>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		loading: !(Object.keys(state.users).length > 0),
	};
};
export default connect(mapStateToProps)(App);
