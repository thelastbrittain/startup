const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const uuid = require('uuid');
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

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

secureApiRouter.post('/auth/logRoute', async (req, res) => {
    console.log("in /auth/logRoute")
    console.log("This is the req body", req.body);
    updatedUser = await DB.updateClimbingLog(req.body.userName, req.body.route);
    console.log("THis is the updated user: ", updatedUser);
    res.send(updatedUser);
});


secureApiRouter.get('/friendInfo/:userName', async (req, res) => {
  console.log("In /friendInfo");
  const userName = req.params.userName;
  const climbingInfoList = await DB.getFriendList(userName);
  res.send(climbingInfoList);
});


secureApiRouter.get('/userLog/:userName', async (req, res) => {
  console.log("in /userLog, this is the passed in email", req.params.userName);
  gradeList = await DB.getGradeListByEmail(req.params.userName)
  res.send(gradeList);
});

/* Helper Functions */
function createClimber(email) {
    return ({"userName": email, 
        "routeList": [],
        "hardestGrade": "",
        "numRoutesClimbed": 0,
        "latestRouteClimbed": ""})
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

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

peerProxy(httpService);



/* 

A user looks like; user = {userName: "Adam Ondra", password: "WOIJH@4$JGOi", token: "OIWJEOIFJ(WE", climbingInfo: climber(as seen below)}
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

user = {userName: "AdamOndra@sendhard.com", password: "iClimb", authToken: "12345", climbingInfo: {
        routeList: [route: {prefix: "11", suffix: "b", style1: "Lead", style2: "PinkPoint"}, data: {10-14-2001}, notes: "Great."},
                    route: {prefix: "11", suffix: "b", style1: "Lead", style2: "PinkPoint"}, data: {10-14-2001}, notes: "Great."}],
        hardestGrade: {prefix: "15", suffix: "d"},
        numRoutesClimbed: 2543,
        latestRouteClimbed: {11-11-2024}
        }
}
*/