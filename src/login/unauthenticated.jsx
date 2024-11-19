import React, { useState } from 'react';
import { MessageDialog } from './messageDialog';


export function Unauthenticated(props) {
	const [userName, setUserName] = useState(props.userName);
	const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

	async function loginUser() {
		loginOrCreate(`/api/auth/login`);
	}

	async function createUser() {
		loginOrCreate(`/api/auth/create`);
	}

	async function loginOrCreate(endpoint) {
		const response = await fetch(endpoint, {
			method: "post",
			body: JSON.stringify({ email: userName, password: password }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		if (response?.status === 200) {
			localStorage.setItem('userName', userName);
			props.onLogin(userName);
		} else {
			const body = await response.json();
			setDisplayError(`⚠ Error: ${body.msg}`);
		}
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

			<MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    )
}