const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('260Pyramid');
const userCollection = db.collection("users");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
    })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

function getUser(email) {
    return userCollection.findOne({ email: email });
}
  
function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function getGradeListByEmail(email){
    const climber = await userCollection.findOne(
        { email: email },
        { projection: { 'climbingInfo.routeList': 1, _id: 0 } } // Only retrieve the updated routeList
      );
      console.log("This is the email passed in: ", email);
      console.log("THis is the climber: ", climber);
      routeList = climber.climbingInfo.routeList;
      console.log("This is the route list: ", routeList);
      let gradeList = [];
      for (const route of routeList){
            gradeList.push(route.prefix + route.suffix);
        }

      return gradeList;
}


async function createUser(email, password, climbingInfo) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      climbingInfo: climbingInfo,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
}

async function getFriendList(email) {
    const climbingInfoArray = await db.collection('users').find(
        { email: { $ne: email } }, // Exclude the user with the given email
        { projection: { climbingInfo: 1, _id: 0 } } // Only return climbingInfo, exclude _id
    ).toArray();
    return climbingInfoArray;
}

async function updateClimbingLog(email, newRoute) {
    const user = await userCollection.findOne({email: email});
    if (!user) {
        console.error("User not found");
        return;
      }
      const currentHardestGrade = user.climbingInfo.hardestGrade;
      let updateHardestGrade = false;
      if (!greaterThan(currentHardestGrade, newRoute)) {
          updateHardestGrade = true; // The new route is harder
      }

      await userCollection.updateOne(
        { email: email }, // Find user by email
        {
          $push: { 'climbingInfo.routeList': newRoute }, // Add new route to routeList
          $inc: { 'climbingInfo.numRoutesClimbed': 1 }, // Increment numRoutesClimbed by 1
          $set: {
            ...(updateHardestGrade && { 'climbingInfo.hardestGrade': { prefix: newRoute.prefix, suffix: newRoute.suffix } }), // Update hardest grade if necessary
            'climbingInfo.latestRouteClimbed': new Date() // Set latestRouteClimbed to the current date and time
          }
        }
      );

      const updatedClimber = await userCollection.findOne(
        { email: email },
        { projection: { 'climbingInfo.routeList': 1, _id: 0 } } // Only retrieve the updated routeList
      );

      return updatedClimber;
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

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    getFriendList,
    updateClimbingLog,
    getGradeListByEmail,
  };
  