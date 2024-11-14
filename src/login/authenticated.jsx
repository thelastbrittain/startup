import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        fetch(`/api/auth/logout`, {
          method: 'delete',
        })
          .catch(() => {
            // Logout failed. Assuming offline
          })
          .finally(() => {
            localStorage.removeItem('userName');
            props.onLogout();
          });
      }

    return (
        <div>
        <div>{props.userName}</div>
        <Button variant='primary' onClick={() => navigate("/updateLog")}>Start Logging</Button>
        <Button variant='primary' onClick={() => logout()}>Log Out</Button>
        </div>
    )
}