import React from 'react';

export function Friends() {
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
          <tbody className="table-dark">
              <tr>
                  <td>1</td>
                  <td><a className="friends-a" href="log.html">Joe</a></td>
                  <td>10c</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><a className="friends-a" href="log.html">Adam Ondra</a></td>
                  <td>15d</td>
                  <td>4987</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td><a className="friends-a" href="log.html">Tommy Caldwell</a></td>
                  <td>15a</td>
                  <td>4988</td>
                </tr>
          </tbody>
      </table>
      <h3>This will be database data</h3>
    </main>
  );
}