const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const path = require("path");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: process.env.port,
  database: process.env.database,
});
db.connect();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/api/result", (req, res) => {
  db.query("SELECT * FROM result", (err, results) => {
    res.send(results);
  });
});

app.post("/api/result", (req, res) => {
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
