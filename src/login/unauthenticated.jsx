import React, { useState } from 'react';
import { Climber } from '../../public/climber';


export function Unauthenticated(props) {
	const [userName, setUserName] = useState(props.userName);
	const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

	async function loginUser() {
		const climber = new Climber(userName)
		localStorage.setItem('user', climber);
		props.onLogin(climber);
	}

	async function createUser() {
		const climber = new Climber(userName)
		localStorage.setItem('user', JSON.stringify(climber));
		props.onLogin(climber);
	}


    return(
        <>
					<div className = "input-group mb-3">
						<span className="input-group-text">@</span>
						<input className="form-control" type="text" placeholder="email" value={userName} onChange={(e) => setUserName(e.target.value)}/>
					</div>
					<div className="input-group mb-3">
						<span className="input-group-text">🔒</span>
						<input className="form-control" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					</div>
					<button className="btn btn-primary" onClick={() => loginUser()} disabled={!userName || !password}>Login</button>
					<button className="btn btn-secondary" onClick={() => createUser()} disabled={!userName || !password}>Create</button>
        </>
    )
}