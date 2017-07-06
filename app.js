const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const models = require('./models')
const routes = require('./routes/routes.js')
const pg = require('pg');
const app = express();

app.engine('mustache', mustache())
app.set('view engine', 'mustache');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(routes)

app.listen(3000, function(){
  console.log("Looking good!")
})
