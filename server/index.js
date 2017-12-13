const express = require('express');
const config = require('./config');
const connectDB = require('./database');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const cors = require('cors');
const logger = require('morgan');

const app = express();
connectDB(config.database);

app.use(logger('dev'));
app.use(cors());
app.use(registerRoute);
app.use(loginRoute);

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));