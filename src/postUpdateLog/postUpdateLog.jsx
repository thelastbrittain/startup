import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export function PostUpdateLog() {
  const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/UpdateLog');
    }
  return (
    <main>
        <hr />
        <h2>Congrats for adding to your pyramid!</h2>
        <img src={climbingImage} 
        alt="climbing image" width="1000" height="500"/>    
        <p>This will be an api to pull various climbing images</p>
        <NavLink to="/updateLog">
          <button className="btn btn-primary">Continue Logging</button>
        </NavLink>
    </main>
  );
}