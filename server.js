'use strict'

// Definition
const express = require('express');
const cookiesParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
var bodyParser = require('body-parser')
var path = require('path')
const app = express();
var bcrypt = require('bcrypt');
const account = require('./models/account');
const { col } = require('sequelize');
var Account = require('./models').Account;
var Client = require('./models').Client;
var Driver = require('./models').Driver;
var CommercialAccount = require('./models').CommercialAccount;
var Vehicle = require('./models').Vehicle;
const port = process.env.port || 3000;

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

app.post('/login', async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + ' ' + password);
  if(username && password){
    const user = await Account.findOne({
        attributes: ['id', 'fullname', 'password'],
        where: { username: username },
        include: [{
          model: CommercialAccount,
          required: false, // Optional, to allow left join
          include: [{
            model: Driver,
            where: { roleId: 1 } // Include Driver if roleId is 1
          }, {
            model: Client,
            where: { roleId: 2 } // Include Client if roleId is 2
          }]
        }]
      });

    if(user){
      const passwordMatch = await bcrypt.compare(password, user.password);
      if(passwordMatch){
        if(user.roleId == 1){
          res.send('Welcome client' + user.fullname)
        } else if(user.roleId == 2){
          res.send('Welcome driver' + user.fullname)
        } else if(user.roleId == 3){
          res.send('Welcome center offier' + user.fullname)
        } else {
          res.send('Welcome admin ' + user.fullname)
        }
      } else {
        res.send('Wrong password')
      }
    } else {
      res.send('Wrong username')
    }
  } else {
    res.send('invalid username or password')
  }
});


app.post('/signUp', (req, res) => {
  req.session.phone = req.body.phone;
  res.redirect('/otp')
});

app.post('/otp', (req, res)=>{
  if(req.body.otp == '0999'){
    res.redirect('createAccount')
  }
})

app.post('/createClientAccount', async (req, res)=>{
  const password = req.body.password;
  const fullname = req.body.fullname;
  const dob = req.body.dob;
  const username = req.body.username;
  const genderId = req.body.genderId;
  const roleId = req.body.roleId;
  const phone = req.body.phone;
  const email = req.body.email;
  const ok = false;
  const newHashedPassword = await bcrypt.hash(password, 10);
  await Account.create({
    fullname: fullname,
    password: newHashedPassword,
    dob: dob,
    username: username,
    genderId: genderId,
    roleId: roleId
  }).then(async (user)=>{
    await CommercialAccount.create({
      phone: phone,
      accountId: user.id
    }).then( async(user)=>{
      await Client.create({
        email: email,
        uid: user.id
      }).then(user=>{
        ok = true;
      })
    })
  });
  if(ok){
    res.send(ok);
  }
})

app.post('/createDriverAccount', async (req, res)=>{
  const personalId = req.body.personalId;
  const driverLicense = req.body.driverLicense;
  const password = req.body.password;
  const fullname = req.body.fullname;
  const dob = req.body.dob;
  const username = req.body.username;
  const genderId = req.body.genderId;
  const roleId = req.body.roleId;
  const phone = req.body.phone;
  const licensePlate = req.body.licensePlate;
  const brand = req.body.brand;
  const color = req.body.color;
  const typeId = req.body.typeId;

  let ok = false;
  const newHashedPassword = await bcrypt.hash(password, 10);
  await Account.create({
    fullname: fullname,
    password: newHashedPassword,
    dob: dob,
    username: username,
    genderId: genderId,
    roleId: roleId
  }).then(async (user)=>{
    await CommercialAccount.create({
      phone: phone,
      accountId: user.id
    }).then( async(user)=>{
      await Driver.create({
        personalId: personalId,
        driverLicense: driverLicense,
        phoneContact: phone,
        uid: user.id
      }).then(async (user)=>{
        await Vehicle.create({
          ownerId: user.id,
          licensePlate: licensePlate,
          brand: brand,
          color: color,
          typeId: typeId,
        }).then((user)=>{
            ok = true;
        })
      })
    })
  });
  if(ok){
    res.redirect('/registerVehicle')
  }
})

app.get('/createAccount', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'createAccount.html'));
})

app.get('/otp', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'otp.html'));
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})