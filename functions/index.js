const functions = require("firebase-functions");

const express = require("express");

const { getApp } = require("firebase/app");
const bodyParser = require("body-parser")
const admin = require("firebase-admin");

var serviceAccount = require("./adminKey.json");
const { getFunctions, connectFunctionsEmulator } = require("firebase/functions");


//initialize express server
const app = express();
const main = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fanzplay-95bfa-default-rtdb.firebaseio.com/',
});
const RTDB = admin.database()


// Point to the RTDB emulator running on localhost.
RTDB.useEmulator("localhost", 9000);



//add the path to receive request and set json as bodyParser to process the body 
main.use('/api/', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));





app.get("/hello", function (req, res) {




    res.send("hello")
})



// Expose Express API as a single Cloud Function:
exports.test = functions.https.onRequest(app);