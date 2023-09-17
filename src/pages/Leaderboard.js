import { useSelector } from "react-redux";

const Leaderboard = () => {

	const users = useSelector((state) => state.users);

	const questions = useSelector((state) => state.questions);

	const usersArray = Object.values(users);
	usersArray && usersArray.sort((a, b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length));

	console.log(usersArray);


	return (
		<div className="container mt-5">
			<table className="table table-bordered">
				<thead className="table-light">
					<tr>
						<th style={{ width: '60%' }}>Users</th>
						<th style={{ width: '20%' }}>Answered</th>
						<th style={{ width: '20%' }}>Created</th>
					</tr>
				</thead>
				<tbody>
					{usersArray.map((user) => (
						<tr key={user.id}>
							<td>
								<img src={user.avatarURL} alt={user.name} className="avatar-img" />
								{user.name}
								<br />
								{user.id}
							</td>
							<td>{Object.keys(user.answers).length}</td>
							<td>{user.questions.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};


export default Leaderboard
