 express = require("express");

const app = express();
var exphbs = require('express-handlebars')
var bodyParser= require('body-parser')

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

app.get('/', (req, res) => {
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
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    db.ref('agenda/' + req.params.id).remove();
    res.redirect('/');
});

app.listen(3000, () => {
  console.log("App running on port 3000...");
});

module.exports = app;


/*const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => { 
    res.send("<h1>Hello from Node, from inside a docker container...</h1>");
    console.log("App running on port 3000...");
});*/
  




