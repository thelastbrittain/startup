const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const uuid = require('uuid');
const DB = require('./database.js');

const authCookieName = 'token';

/* Data Structures */
let users = {};

// service port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// automatically parse JSON --middleware
app.use(express.json());
app.use(cors());


// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// allow to pull from public files
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// modularize routes for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


/*  ENDPOINTS  */

// if not existing, create new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.email, req.body.password, createClimber(req.body.email));

      // Set the cookie
      setAuthCookie(res, user.token);

      res.send({
        id: user._id,
      });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// create route for secure endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

// add middleware that will verify the user
secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Log Route /log 
// takes a route and userName
// adds route to userName given
// returns an empty body
secureApiRouter.post('/auth/logRoute', async (req, res) => {
    console.log("in /auth/logRoute")
    console.log("This is the req body", req.body);
    console.log("These are the current users: ", users);
    const userName = req.body.userName;
    if (userName in users) {
        users[userName].climbingInfo.routeList.push((req.body.route)); // add route to the list
        users[userName].climbingInfo.numRoutesClimbed += 1; // update num of routes climbed
        users[userName].climbingInfo.latestRouteClimbed = new Date(); // update date of most recent climb
        updateHardestRoute(userName, req.body.route); // update hardest route 
        res.send({});
        return;
      };
    res.status(401).send({ msg: 'Incorrect data' });
  });


// Get Friends
// Takes a username
// returns climbing info for each person other than the username requesting it
secureApiRouter.get('/friendInfo/:userName', async (req, res) => {
  console.log("In /friendInfo");
  const userName = req.params.userName;
  console.log("this is the username incoming", userName);
  const climbingInfoList = await DB.getFriendList(userName);
  res.send(climbingInfoList);
});

// apiRouter.get('/friendInfo/:userName', (req, res) => {
//     console.log("In /friendInfo");
//     const userName = req.params.userName;
//     console.log("this is the username incoming", userName);
//     if (userName in users){
//         climbingInfoList = [];
//         for (const [key, value] of Object.entries(users)){
//             if (key !== userName){
//                 climbingInfoList.push(value.climbingInfo)
//             }
//         }
//         console.log("This is what is being sent back: ", climbingInfoList);
//         res.send(climbingInfoList);
//     } else {
//         res.status(401).send({ msg: 'Unauthorized' });
//     }
//   });


// userLog
// take a userName
// Returns routeList of that user
apiRouter.get('/userLog/:userName', (req, res) => {
    console.log("In /userLog");
    console.log("this is the req.params", req.params);
    userName = req.params.userName;
    console.log("This is the username we're getting", userName);
    console.log("These are the current users:", users);
    if (userName in users){
        gradeList = []
        for (const route of users[userName].climbingInfo.routeList){
            gradeList.push(route.prefix + route.suffix);
        }
        res.send(gradeList);
    } else {
        res.status(401).send({ msg: 'User Not Found' });
    }
});


/* Helper Functions */

function updateHardestRoute(user, route){
    // if hardest, update hardest
    let currentGrade = users[user].climbingInfo.hardestGrade;
    console.log("This is the current grade: ", currentGrade);
    console.log("This is the new grade: ", route);
    if (greaterThan(currentGrade, route)){
        return;
    } 
    console.log("Updating new hardest route to be: ", route);
    users[user].climbingInfo.hardestGrade = {"prefix": route.prefix, "suffix": route.suffix};
    
}

function createClimber(email) {
    return ({"userName": email, 
        "routeList": [],
        "hardestGrade": "",
        "numRoutesClimbed": 0,
        "latestRouteClimbed": ""})
}

function greaterThan(currentGrade, newGrade) {
    console.log("Current grade prefix and suffix: ", currentGrade.prefix, currentGrade.suffix);
    console.log("New grade prefix and suffix: ", newGrade.prefix, newGrade.suffix);

    // Convert prefixes to numbers for numerical comparison
    const currentPrefix = parseInt(currentGrade.prefix, 10);
    const newPrefix = parseInt(newGrade.prefix, 10);

    if (!currentPrefix) return false; 

    // Compare prefixes numerically
    if (currentPrefix < newPrefix) {
      return false;
    } else if (currentPrefix > newPrefix) {
      return true;
    } else {

      // If current grade has no suffix and new grade does, new grade is harder
      if (!currentGrade.suffix && newGrade.suffix) {
        return false;
      }
      // If current grade has a suffix but new grade does not, current grade is harder
      if (currentGrade.suffix && !newGrade.suffix) {
        return true;
      }

      if (currentGrade.suffix < newGrade.suffix) {
        return false;
      } else if (currentGrade.suffix > newGrade.suffix) {
        return true;
      } else {
        // If both prefix and suffix are equal, current grade is not greater
        return false;
      }
    }
}

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

/* Start Listening */

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });




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