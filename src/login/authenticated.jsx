import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        console.log("logging out")
        localStorage.removeItem('userName');
        props.onLogout();
        
    }

    return (
        <div>
        <div>{props.userName}</div>
        <Button variant='primary' onClick={() => navigate("/log")}>Start Logging</Button>
        <Button variant='primary' onClick={() => logout()}>Log Out</Button>
        </div>
    )
}