import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Log } from './log/log';
import { Friends } from "./friends/friends"
import { About } from "./about/about"
import { UpdateLog } from './updateLog/updateLog'



export default function App() {
    return( 
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <Header/>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/log" element={<Log/>}/>
                    <Route path="/friends" element={<Friends/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/updateLog" element={<UpdateLog/>}/>
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


function Header() {
    return (
        <header className="container-fluid">
			<nav className = "navbar fixed-top navbar-light bg-white">
				<NavLink className = "navbar-brand" to="login">Pryamid &#x25B2;</NavLink>
			<menu className = "navbar-nav">
				<li className = "nav-item">
					<NavLink className = "nav-link active" to="log">Your Log</NavLink>
				</li>
				<li className = "nav-item">
					<NavLink className = "nav-link active" to="updateLog">Update Log</NavLink>
				</li>
				<li className = "nav-item">
					<NavLink className = "nav-link active" to="friends">Friends</NavLink>
				</li>
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