const bodyParser = require('body-parser');
const express = require('express');
const app = require('express')();
const API = require('json-api');
const mongoose = require('mongoose');
const APIError = API.types.Error;
mongoose.connect('mongodb://localhost/server_badrinath_beddok_collot');

const models = {
  Vehicle: require('./models/vehicle').model,
  User: require('./models/user').model,
  Trip: require('./models/trip').model
};

const registry_templates = {
  vehicles: require('./models/vehicle').registry,
  users: require('./models/user').registry,
  trips: require('./models/trip').registry
};

const adapter = new API.dbAdapters.Mongoose(models);
const registry = new API.ResourceTypeRegistry(registry_templates, { dbAdapter: adapter });

const docs = new API.controllers.Documentation(registry, { name: 'POC API' });
const controller = new API.controllers.API(registry);
const front = new API.httpStrategies.Express(controller, docs);

const apiReqHandler = front.apiRequest.bind(front);

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
  res.header('Access-Control-Allow-Methods',
    'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

const db = [
    'users',
    'trips',
    'vehicles'
];

app.options('*', function(req, res) {
  res.send();
});

app.get('/api', front.docsRequest.bind(front));

app.route(`/api/:type(${db.join('|')})`).get(apiReqHandler).post(apiReqHandler)
  .patch(apiReqHandler);

app.route(`/api/:type(${db.join('|')})/:id`).get(apiReqHandler).patch(apiReqHandler)
    .delete(apiReqHandler);

app.route(`/api/:type(${db.join('|')})/:id/relationships/:relationship`)
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler)
  .delete(apiReqHandler);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/api/auth', function(req, res) {
  if(!req.body.hasOwnProperty('username') ||
      !req.body.hasOwnProperty('password')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }
  const username = req.body.username;
  const password = req.body.password;
  
  models.User.findOne({ 'name': username, 'password' : password }, 'name', function (err, user) {
    if (err) return res.send(false);
    else return user == null? res.send(false) : res.send(user.id);
  })
  
});

app.use(function(req, res, next) {
  front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});

app.listen(3000);

console.log("Listening...");
