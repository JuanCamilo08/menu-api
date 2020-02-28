const { logger, loggingErrors } = require('./startup/logging');
//this is to have every possible error cover and log them (for the correct log of every error this should be at the top)
loggingErrors();

const express = require('express');
const app = express();

// initialize the db
require('./startup/db')();

// some stuff to help in the validations
require('./startup/validate')();

//routes
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info('Listening on port 3000...'));
