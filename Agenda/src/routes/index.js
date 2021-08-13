const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.render('index.hbs')
 });

app.listen(3000, () => {
  console.log("App running on port 3000...");
});



/*const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => { 
    res.send("<h1>Hello from Node, from inside a docker container...</h1>");
    console.log("App running on port 3000...");
});*/
  

module.exports = app;