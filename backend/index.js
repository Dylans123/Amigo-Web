const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (request, response) => {
  response.json({info: 'Node.js, Express, and Postgres API'})
});

app.post('/api/signup', db.signup);
app.post('/api/login', db.login);
app.post('/api/displayUserInfo', db.validateUser, db.displayUserInfo);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});