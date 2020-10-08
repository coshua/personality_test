/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var mysql = require("mysql");
var cors = require("cors");
// declare a new express app
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
const db = mysql.createConnection({
  host: "personality.cm18unzrhz2y.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "09282020",
  port: "3306",
  database: "personality",
});
db.connect();
// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Method", "*");
  next();
});

/**********************
 * Example get method *
 **********************/
var queryStat = `SELECT SUM(CASE WHEN category = "ISTJ" THEN 1 ELSE 0 END) AS "ISTJ",
SUM(CASE WHEN category = "ISTP" THEN 1 ELSE 0 END) AS "ISTP",
SUM(CASE WHEN category = "ISFJ" THEN 1 ELSE 0 END) AS "ISFJ",
SUM(CASE WHEN category = "ISFP" THEN 1 ELSE 0 END) AS "ISFP",
SUM(CASE WHEN category = "INFJ" THEN 1 ELSE 0 END) AS "INFJ",
SUM(CASE WHEN category = "INFP" THEN 1 ELSE 0 END) AS "INFP",
SUM(CASE WHEN category = "INTJ" THEN 1 ELSE 0 END) AS "INTJ",
SUM(CASE WHEN category = "INTP" THEN 1 ELSE 0 END) AS "INTP",
SUM(CASE WHEN category = "ESTP" THEN 1 ELSE 0 END) AS "ESTP",
SUM(CASE WHEN category = "ESTJ" THEN 1 ELSE 0 END) AS "ESTJ",
SUM(CASE WHEN category = "ESFP" THEN 1 ELSE 0 END) AS "ESFP",
SUM(CASE WHEN category = "ESFJ" THEN 1 ELSE 0 END) AS "ESFJ",
SUM(CASE WHEN category = "ENFP" THEN 1 ELSE 0 END) AS "ENFP",
SUM(CASE WHEN category = "ENFJ" THEN 1 ELSE 0 END) AS "ENFJ",
SUM(CASE WHEN category = "ENTP" THEN 1 ELSE 0 END) AS "ENTP",
SUM(CASE WHEN category = "ENTJ" THEN 1 ELSE 0 END) AS "ENTJ" FROM result`;
app.get("/items/result", (req, res) => {
  db.query(queryStat, (err, results) => {
    res.send(results);
  });
});

app.get("/items", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post("/items/result", function (req, res) {
  try {
    db.query(
      "INSERT INTO result(response, category, created) VALUES(?,?,DEFAULT)",
      [req.body.response, req.body.category],
      (err, results) => {
        if (err) throw err;
        res.end();
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/****************************
 * Example put method *
 ****************************/

/****************************
 * Example delete method *
 ****************************/

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
