import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
	const [userName, setUserName] = useState(props.userName);
	const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

	async function loginUser() {
		localStorage.setItem('userName', userName);
		props.onLogin(userName);
	}

	async function createUser() {
		localStorage.setItem('userName', userName);
		props.onLogin(userName);
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