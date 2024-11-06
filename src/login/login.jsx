import React from 'react';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';

export function Login({userName, authState,  onAuthChange}) {
	return (
    <main className = "container-fluid text-center">
		<div>
		{authState !== AuthState.Unknown && (<h1>Lets Get Climbing</h1>)}
		{authState === AuthState.Authenticated && (<Authenticated userName={userName} 
		onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
		/>)}
		{authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
		</div>
	</main>
  );
}