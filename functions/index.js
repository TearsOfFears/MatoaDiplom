const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: true,
}));

app.use(express.json());

app.get("*", (req, res)=>{
  res.status(404),
  res.send("404 , Not found.");
});

exports.api = functions.https.onRequest(app);
