const express = require('express');
var app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
var file = require('file-system');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(__dirname + '/public'));
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nsaelection"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected");
})
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/election", (req, res) => {
    res.render("nsaelectionform");
})

app.post("/election", (req, res) => {
const fname = connection.escape(req.body.fname);
const mname = connection.escape(req.body.mname);
const lname = connection.escape(req.body.lname);
const email = connection.escape(req.body.email);
const gmail = connection.escape(req.body.gmail);
const cwid = connection.escape(req.body.cwid);
const phone = connection.escape(req.body.phone);
const address1 = connection.escape(req.body.address1);
const address2 = connection.escape(req.body.address2);
const city = connection.escape(req.body.city);
const state =connection.escape(req.body.state);
const zip = connection.escape(req.body.zip);
const major = connection.escape(req.body.major);
const classification = connection.escape(req.body.classification);
const membership = connection.escape(req.body.membership);
const position = connection.escape((req.body.position).toString());
const reason = connection.escape(req.body.reason);
const contribution = connection.escape(req.body.contribution);
const change = connection.escape(req.body.change);
const involvement = connection.escape(req.body.involvement);
console.log(req.body);

  var sql = "INSERT INTO ELECTION (fname, mname, lname, email, gmail, cwid, phone, address1, address2, city, state, zip, major, classification, membership, position, reason, contribution, changes, involvement) VALUES (" + fname + ", " + mname + ", " + lname + ", " + email + ", " + gmail + ", " + cwid + ", " + phone + ", " + address1 + ", "+ address2 +", " + city + ", " + state + ", " + zip + ", " + major + ", " + classification + ", " + membership + ", "+ position +", " + reason + ", " + contribution + ", "+ change +", " + involvement + ")";
  //console.log(sql)
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("table created");
        res.status(200).json("Successful!");
    });
  
});

