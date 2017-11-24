const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { format } = require('date-fns');

const app = express();

const server = http.Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const logs = [];

app.get('/', (req, res) => {
  const data = { logs };
  
  res.render('index', data);
});

app.get('/logs', (req, res) => {
  res.json(logs);
});

app.post('/logs', (req, res) => {
  const { elevation } = req.body;
  const log = { elevation: parseInt(elevation), createdAt: format(new Date(), 'YYYY-MM-DD HH:mm:ss') };

  logs.push(log);

  io.emit('logs.added', log);

  res.json({ status: 'Ok' });
});

module.exports = server;