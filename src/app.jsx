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
import { Climber } from '../public/climber';
import { Style } from '../public/style';
import { Route as ClimbingRoute } from '../public/route';
import { Grade } from '../public/grade';

export default function App() {
    const getUserFromLocalStorage = () => {
        let storedUser = localStorage.getItem("user");
        console.log(storedUser);
        if (storedUser) {
            storedUser = JSON.parse(storedUser);
            const climber = new Climber(storedUser.userName);

        // Restore routeList and re-instantiate each route's Grade and Style
        climber.routeList = storedUser.routeList.map(route => {
            return new ClimbingRoute(
                new Grade(route.grade.prefix, route.grade.suffix), // Recreate Grade instance
                new Style(route.style.type, route.style.subType),  // Recreate Style instance
                new Date(route.date),                              // Convert date back to Date object
                route.notes                                        // Restore notes
            );
        });

        // Recreate hardestGrade as an instance of Grade
        climber.hardestGrade = new Grade(storedUser.hardestGrade.prefix, storedUser.hardestGrade.suffix);

        // Restore other properties
        climber.numRoutesClimbed = storedUser.numRoutesClimbed; 
        climber.latestRouteClimbed = new Date(storedUser.latestRouteClimbed); // Convert back to Date

        return climber; // Return the Climber instance
    } else {
        return("null");
        }
    };
    
    const [user, setUser] = useState(getUserFromLocalStorage() || '')
    const [userName, setUserName] = useState(user ? user.userName : '');
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
                        onAuthChange={(climber, authState) => {
                        setAuthState(authState);
                        setUser(climber)
                        setUserName(climber.userName);
                        }}
                        />
                        }
                        exact
                    />
                    <Route path="/log" element={<Log/>}/>
                    <Route path="/friends" element={<Friends/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/updateLog" element={<UpdateLog
                    onClimberChange={(prefix, suffix, style, stlye2, notes) => {
                        if (user && typeof user.addRoute === 'function') {
                            user.addRoute(new ClimbingRoute(new Grade(prefix, suffix), new Style(style, stlye2), new Date(), notes)); 
                            console.log(user);
                        } else {
                            console.error('addRoute method not found on user');
                        }
                    }}
                    />}/>
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
                {authState === AuthState.authState && (<li className = "nav-item">
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