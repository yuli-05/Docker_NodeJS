express = require("express");

 //LOGIN
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const csrfMiddleware = csrf({cookie:true});

const app = express();
var exphbs = require('express-handlebars')
var bodyParser= require('body-parser')

//LOGIN
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);



app.use(bodyParser.urlencoded({extended: true }))
app.use(express.static('public'))

//cambie variable
const admin =  require('firebase-admin');


var serviceAccount = require("/workspace/Docker_NodeJS/Agenda/agenda2-1930b-firebase-adminsdk-wv3ia-21e2881362.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://agenda2-1930b-default-rtdb.firebaseio.com/"
});

const db = admin.database();

//LOGIN
app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

app.get("/login", function (req, res) {
  res.render("login.hbs");
});

app.get("/signup", function (req, res) {
  res.render("signup.hbs");
});

app.get("/profile", function (req, res) {
  const sessionCookie = req.cookies.session || "";

  admin.auth().verifySessionCookie(sessionCookie,true)
    .then(() => {
      res.render("profile.hbs");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

app.get("/", function (req, res) {
  res.render("index2.hbs");
});

app.get('/sessionLogin',(req,res) => {
  res.clearCookie("session")
  res.redirect('/login')
});

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
        res.redirect('/login')
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});



//AGENDA
app.get('/agenda', (req, res) => {
    db.ref('agenda').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index.hbs', { agenda: data });
    });
  //res.render('index.hbs')
});

 /*app.post('/new-contact', (req, res)  => {
     console.log();
     /*const newCon = {
         name: req.body.name,
         email: req.body.email
     };*/
     //db.ref('Agenda').push(req.body);
     //res.send('received');
//});

app.post('/guardar', (req, res) => {
    console.log(req.body);
    db.ref('agenda').push(req.body);
    res.redirect('/agenda');
});

app.get('/delete/:id', (req, res) => {
    db.ref('agenda/' + req.params.id).remove();
    res.redirect('/agenda');
});

app.listen(3000, () => {
  console.log("App running on port 3000...");
});

module.exports = app;


/*const { Router } = require('express');
const router = Router();

app.get('/', (req, res) => { 
    res.send("<h1>Hello from Node, from inside a docker container...</h1>");
    console.log("App running on port 3000...");
});*/
  




