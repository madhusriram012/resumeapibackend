const express = require('express');
const logger = require('morgan');
const jwt = require('jsonwebtoken')
const cors = require('cors')

const indexRouter = require('./src/routes/index');
const resumeRouter = require('./src/routes/resume');
const loginRouter = require('./src/routes/login');
const config = require('config');

const secret = config.get('jwt.secret');

const app = express();

const errorResponder = (error, request, response, next) => {
    response.header("Content-Type", 'application/json')
    const statusCode = error.statusCode || 500
    response.status(statusCode).json({statusCode: statusCode, errorMessage: error.message})
}
const invalidPathHandler = (request, response, next) => {
    response.status(404)
    response.json({statusCode: 404, errorMessage: 'path not found'})
}

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

// The middleware
const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    if (!token) {
        return res.status(401).json({ message: 'unauthorized' })
    }

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'bad token' })
        }
    })

    next()
}

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/resume',checkTokenMiddleware,resumeRouter);

app.use(errorResponder)
app.use(invalidPathHandler)

module.exports = app;
