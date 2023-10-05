//Import environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//Import the required libraries
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
var AWS = require('aws-sdk');

// Set the region 
let awsConfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "AKIATNYGUNULOGNRE4M6",
    "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

//Initialise Passport.js
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

//Get data from AWS and store in users[]
let docClient = new AWS.DynamoDB.DocumentClient();

function getData(data) {
    data = data.Items
        //console.log(data)
        //let arr = []
    len = Object.keys(data).length
    for (let i = 0; i < len; i++)
        users.push(data[i])
        //console.log(users);
}

docClient.scan({
        TableName: "user_data"
    })
    .promise()
    .then(data => getData(data))
    .catch(console.error)

app.engine('html', require('ejs').renderFile);
//app.use(express.static('./views/index'));
app.use(express.static('./views'));
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
        secret: "secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 30, expires: 5 * 60 * 1000 }
        // Session is Valid upto 1 month but will expire after 5 minutes of user inactivity
    }))
    //console.log(process.env.secret_key)
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//let name = ""
app.get('/', checkAuthenticated, (req, res) => {
    //name = req.user.email
    //console.log("!==>! " + req.user)
    res.render('index/index.html')
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.html')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.html')
})

app.post('/register', checkNotAuthenticated, async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
                id: Date.now().toString(),
                //name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            //Add user data to AWS Dynamo DB
        var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
        var params = {
            TableName: 'user_data',
            Item: {
                'id': { S: Date.now().toString() },
                'email': { S: req.body.email },
                'password': { S: hashedPassword },
            }
        };
        // Call DynamoDB to add the item to the table
        ddb.putItem(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        });

        //console.log(users)
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.delete('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(process.env.port)