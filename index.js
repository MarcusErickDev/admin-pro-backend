require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Create express server
const app = express();

// Configure cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// DataBase
dbConnection();

// Routes
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
  console.log('server running ' + process.env.PORT);
});