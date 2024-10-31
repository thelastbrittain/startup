import React from 'react';
import "./log.css"

export function Log() {
  return (
    <>
      <main class="log-main">
        <h1 class="log-header">Welcome to your log</h1>
        <div class="pyramid"></div>
            <div class="row">
                <svg width="50" height="50">
                    <circle cx="25" cy="25" r="20" fill="white" stroke="black"/>
                    <text x="25" y="30" font-size="15" text-anchor="middle" fill="black">5.9</text>
                </svg>
            </div>
            <div class="row">
                <svg width="50" height="50">
                    <circle cx="25" cy="25" r="20" fill="white" stroke="black"/>
                    <text x="25" y="30" font-size="15" text-anchor="middle" fill="black">5.8</text>
                </svg>
                <svg width="50" height="50">
                    <circle cx="25" cy="25" r="20" fill="white" stroke="black"/>
                    <text x="25" y="30" font-size="15" text-anchor="middle" fill="black">5.8</text>
                </svg>
            </div>

            <div class="row">
                <svg width="50" height="50">
                    <circle cx="25" cy="25" r="20" fill="white" stroke="black"/>
                    <text x="25" y="30" font-size="15" text-anchor="middle" fill="black">5.7</text>
                </svg>
                <svg width="50" height="50">
                    <circle cx="25" cy="25" r="20" fill="white" stroke="black"/>
                    <text x="25" y="30" font-size="15" text-anchor="middle" fill="black">5.7</text>
                </svg>
                <svg width="50" height="50">
                    <circle cx="25" cy="25" r="20" fill="white" stroke="black"/>
                    <text x="25" y="30" font-size="15" text-anchor="middle" fill="black">5.7</text>
                </svg>
            </div>
        <p>(This is websocket data that will be updated in real time)</p>
    </main>
    </>
  );
}