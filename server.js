'use strict'

// Definition
const express = require('express');
const cookiesParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
var bodyParser = require('body-parser')
const cors = require('cors')
var path = require('path')
const app = express();
const port = process.env.port || 3000;

const allowedOrigins = ['http://127.0.0.1:4000', 'http://localhost:4000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}


app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookiesParser("COOKIE_SECRET"));
app.use(
  session({
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,  // Set this attribute as true only in production evironment
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: 'Lax' // or 'Strict' or 'None' depending on your needs
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./api-gateway/index.gateway'));
app.use('/api', require('./api-gateway/api.gateway'));
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})