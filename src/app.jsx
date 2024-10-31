import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return( 
        <div className='body bg-dark text-light'>
        <Header/>
        This is my App
        <Footer/>
        </div>
    )
}


function Header() {
    return (
        <header className="container-fluid">
			<nav className = "navbar fixed-top navbar-light bg-white">
				<a className = "navbar-brand" href="index.html">Pryamid &#x25B2;</a>
			<menu className = "navbar-nav">
				<li className = "nav-item">
					<a className = "nav-link active" href="log.html">Your Log</a>
				</li>
				<li className = "nav-item">
					<a className = "nav-link active" href="updateLog.html">Update Log</a>
				</li>
				<li className = "nav-item">
					<a className = "nav-link active" href="friends.html">Friends</a>
				</li>
				<li className = "nav-item">
					<a className = "nav-link active" href="about.html">About</a>
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
            <a href="https://github.com/thelastbrittain/startup">Link to project GitHub</a>
        </div>
      </footer>
    )
}