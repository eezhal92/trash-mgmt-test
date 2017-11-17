const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

const server = http.Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const logs = [{ temp: 10, hum: 20 }, { temp: 12, hum: 9 }];

app.get('/', (req, res) => {
  const data = { logs };
  
  res.render('index', data);
});

app.get('/logs', (req, res) => {
  res.json(logs);
});

app.post('/logs', (req, res) => {
  const { temp1, hum1 } = req.body;
  const log = { temp: temp1, hum: hum1 };

  logs.push(log);

  io.emit('logs.added', log);

  res.json({ status: 'Ok' });
});

module.exports = server;