const express = require('express');
const uuid = require('uuid');
const app = express();

/* Data Structures */
let users = {"testUser": {"userName": "TestUsername", "password": "testPassword"}};

// service port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// automatically parse JSON --middleware
app.use(express.json());

// allow to pull from public files
app.use(express.static('public'));

// modularize routes for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);



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
                            date: {10-14-2001}, 
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



/*  ENDPOINTS  

*/

// if not existing, create new user
apiRouter.post('/auth/create', async (req, res) => {
    console.log("In auth/create")
    const user = users[req.body.email];
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = { email: req.body.email, password: req.body.password, token: uuid.v4(), climbingInfo: createClimber(req.body.email)};
      users[user.email] = user;
  
      res.send({ token: user.token });
    }
  });

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    console.log("in /auth/login")
    const user = users[req.body.email];
    if (user) {
      if (req.body.password === user.password) {
        user.token = uuid.v4();
        res.send({ token: user.token });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      delete user.token;
    }
    res.status(204).end();
  });

// Log Route /log 
// takes a route and userName
// adds route to userName given
// returns an empty body
apiRouter.post('/auth/logRoute', async (req, res) => {
    console.log("in /auth/logRoute")
    const user = users[req.body.email];
    if (user in users) {
        users[user].climbingInfo.routeList.push((req.body.route)); // add route to the list
        users[user].climbingInfo.numRoutesClimbed += 1; // update num of routes climbed
        users[user].climbingInfo.latestRouteClimbed = req.body.route.date; // update date of most recent climb
        updateHardestRoute(user, req.body.route); // update hardest route 
        res.send({});
        return;
      };
    res.status(401).send({ msg: 'Incorrect data' });
  });


// Get Friends
// Takes a username
// returns climbing info for each person other than the username requesting it
apiRouter.get('/friendInfo', (req, res) => {
    console.log("In /friendInfo");
    const userName = req.body.userName;
    if (userName in users){
        climbingInfoList = [];
        for (const [key, value] of Object.entries(users)){
            if (key !== userName){
                climbingInfoList.push(value.climbingInfo)
            }
        }
        res.send(climbingInfoList);
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
  });


// userLog
// take a userName
// Returns routeList of that user
apiRouter.get('/userLog', (req, res) => {
    console.log("In /userLog");
    userName = req.body.userName
    if (userName in users){
        res.send(users[userName].climbingInfo.routeList);
    } else {
        res.status(401).send({ msg: 'User Not Found' });
    }
  });


  //This is just a test. Don't implement this
  apiRouter.get('/users', (_req, res) => {
    console.log("In /users");
    res.send(users);
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


function updateHardestRoute(user, route){
    // if hardest, update hardest
    if (greaterThan(users[user].climbingInfo.hardestGrade), route.grade){
        return;
    } 
    users[user].climbingInfo.hardestGrade = route.grade;
    
}

function createClimber(email) {
    return ({"userName": email, 
        "routeList": [],
        "hardestGrade": "",
        "numRoutesClimbed": 0,
        "latestRouteClimbed": ""})
}

function greaterThan(currentGrade, newGrade) {
    if (currentGrade.prefix < newGrade.prefix) {
        return false;
    } else if (currentGrade.prefix > newGrade.prefix) {
        return true;
    } else {
        if (currentGrade.suffix <= newGrade.suffix){
            return false;
        } else {
            return true;
        }
    }
}