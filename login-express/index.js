const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const {logErrors, wrapErrors, errorHandler} = require('./utils/middleware/errorHandler');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const { config } = require('./config');
const { dbConnection } = require('./lib/mysql');

const indexRouter = require('./routes/index.router');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

// dbConnection();


app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.use(notFoundHandler);

app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}/api`);
});