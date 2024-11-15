import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Log } from './log/log';
import { Friends } from "./friends/friends"
import { About } from "./about/about"
import { UpdateLog } from './updateLog/updateLog'
import { PostUpdateLog } from './postUpdateLog/postUpdateLog';
import { AuthState } from './login/authState';

export default function App() {
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = useState(currentAuthState);

    return( 
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <Header authState={authState}/>
                <Routes>
                    <Route path="/" element={<Login
                        userName={userName}
                        authState={authState}
                        onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
                        }}
                        />
                        }
                        exact
                    />
                    <Route path="/log" element={<Log userName={userName}/>}/>
                    <Route path="/friends" element={<Friends userName={userName}/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/updateLog" element={<UpdateLog userName={userName}/>}/>
                    <Route path="/postUpdateLog" element={<PostUpdateLog/>}/>
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }


function Header({authState}) {
    return (
        <header className="container-fluid">
			<nav className = "navbar fixed-top navbar-light bg-white">
				<NavLink className = "navbar-brand" to="/">Pryamid &#x25B2;</NavLink>
			<menu className = "navbar-nav">
                <li className = "nav-item">
					<NavLink className = "nav-link active" to="/">Login</NavLink>
				</li>
                {authState === AuthState.Authenticated && (<li className = "nav-item">
					<NavLink className = "nav-link active" to="log">Your Log</NavLink>
				</li>)}
				{authState === AuthState.Authenticated && (<li className = "nav-item">
					<NavLink className = "nav-link active" to="updateLog">Update Log</NavLink>
				</li>)}
				{authState === AuthState.Authenticated && (<li className = "nav-item">
					<NavLink className = "nav-link active" to="friends">Friends</NavLink>
				</li>)}
				<li className = "nav-item">
					<NavLink className = "nav-link active" to="about">About</NavLink>
				</li>
			</menu>
	  </nav>
	</header>
    )
}

function Footer() {
    return (
        <footer className = "bg-white text-dark">
        <div className="container-fluid">
            <span className="text-reset">Benjamin Brittain</span>
            <br />
            <NavLink to="https://github.com/thelastbrittain/startup">Link to project GitHub</NavLink>
        </div>
      </footer>
    )
}