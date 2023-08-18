require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Create express server
const app = express();

// Configure cors
app.use(cors());

// DataBase
dbConnection();

// Routes
app.get('/', (req,res) => {
  res.json({
    ok: true,
    msg: 'hello world'
  });
});

app.listen(process.env.PORT, () => {
  console.log('server running ' + process.env.PORT);
});