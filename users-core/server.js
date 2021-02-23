const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
const db = require('./db');
const routes = require('./routes');

// Cors middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));

// Bodyparsing middleware
app.use(express.json());

// Router middleware
app.use('/', routes);
app.use((_req, res) => res.status(404).send());

// Error handler endware
app.use((err, _req, res) => {
  res.status(500).send(err);
});

db.on('error', console.log);
db.once('open', () => console.log('DATABASE was successfully connnected'));

const server = app.listen(port, () => console.log(`Users Core REST API listening on port: ${port}`));
module.exports = server;
