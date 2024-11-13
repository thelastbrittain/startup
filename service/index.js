const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

// allow to pull from public files
app.use(express.static('public'));

// automatically parse JSON --middleware
app.use(express.json());

// modularize routes for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

/* Data Structures */
let users = [];

/* 
A climber looks like: 
climber = {userName: "Adam Ondra", 
        routeList: [{grade: {prefix: "11", suffix: "b"}, style: {type1: "Lead", type2: "PinkPoint"}, data: {10-14-2001}, notes: "Great."},
                    {grade: {prefix: "13", suffix: "b"}, style: {type1: "TopRope", type2: """}, data: {10-14-2001}, notes: "Epic."}],
        hardestGrade: {prefix: "15", suffix: "d"},
        numRoutesClimbed: 2543,
        latestRouteClimbed: {11-11-2024}
        }
Methods = addRoute

Route Looks like: route = {grade: {prefix: "11", suffix: "b"}, 
                            style: {type1: "Lead", type2: "PinkPoint"}, 
                            data: {10-14-2001}, 
                            notes: "Great."
                            }
Methods: None

Grade looks like; grade = {prefix: "11", 
                            suffix: "b"}
Methods: greaterThan, lessThan, equalTo

//maybe users should be like: This way the climbing info can still be a part of the user, but it's in a different level 
user = {userName: "AdamOndra@sendhard.com", password: "iClimb", authToken: "12345", climbingInfo: {
        routeList: [{grade: {prefix: "11", suffix: "b"}, style: {type1: "Lead", type2: "PinkPoint"}, data: {10-14-2001}, notes: "Great."},
                    {grade: {prefix: "13", suffix: "b"}, style: {type1: "TopRope", type2: """}, data: {10-14-2001}, notes: "Epic."}],
        hardestGrade: {prefix: "15", suffix: "d"},
        numRoutesClimbed: 2543,
        latestRouteClimbed: {11-11-2024}
        }
}
*/



/*  ENDPOINTS */ 

// Create Account /auth/create
// takes username and password
// if user not already found
// creates auth
// create user using uname, password, and auth
// puts him into the list of users
// returns the token


// Login /auth/login
// takes a username and password
// if the user exists
// if the password is correct
// generate and place in the user the correct auth
// return the auth
// otherwise send a 401


// Logout /auth.logout
// takes an auth
// finds the user with that auth
// deletes the auth
// send back 204

// Log Route /log 
// takes an auth token and a route
// finds the user with the auth
// adds the route to the climber
// updates most recent climb
// potentially updates the hardest climb


// Get Friends
// takes an auth
// if authenticated
// returns user objects with the needed information

// Show Log
// takes a username
// if that user is in users
// send back that user's routes




