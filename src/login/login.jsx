import React from 'react';

export function Login() {
  return (
    <main className = "container-fluid text-center">
		<div>
		<h1>Lets Get Climbing</h1>
		<form action="log.html" method="get">
			<div className = "input-group mb-3">
				<span className="input-group-text">@</span>
				<input className="form-control" type="text" placeholder="email" required />
			</div>
			<div className="input-group mb-3">
				<span className="input-group-text">🔒</span>
				<input className="form-control" type="password" placeholder="password" required />
			</div>
			<button className="btn btn-primary" type="submit">Login</button>
			<button className="btn btn-secondary" type="submit">Create</button>
		</form>
		</div>
	</main>
  );
}