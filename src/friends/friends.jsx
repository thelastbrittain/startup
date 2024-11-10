import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Friends() {
  const [climbers, setClimbers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const climberList = localStorage.getItem('climbers');
    if (climberList) {
      setClimbers(JSON.parse(climberList));
    }
    console.log(climberList);
  }, []);

  const handleRowClick = () => {
    navigate("/log");
  }

  // Demonstrates rendering an array with React
  const climberRows = [];
  if (climbers.length) {
    for (const [i, climber] of climbers.entries()) {
      climberRows.push(
        <tr key={i}
        onClick={handleRowClick} style={{ cursor: 'pointer' }}>
          <td>{i}</td>
          <td>{climber.userName}</td>
          <td>{`${climber.hardestGrade.prefix}.${climber.hardestGrade.suffix}`}</td>
          <td>{climber.numRoutesClimbed}</td>
        </tr>
      );
    }
  } else {
    climberRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to log your climbs!</td>
      </tr>
    );
  }

  return (
    <main>
      {/* <!-- Columns:  Name, hardest route, number of routes climbed --> */}
        {/* <!-- 336799 MTN Proj blue color --> */}
      <h1 className="friends-header">How are your friends doing?</h1>
      <table className="table table-striped table-bordered custom-border friends-table">
          <thead className="table-dark">
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Hardest Send</th>
                  <th>Routes logged</th>
              </tr>
          </thead>
          <tbody className="table-dark">{climberRows}</tbody>
      </table>
      <h3>This will be database data</h3>
    </main>
  );
}