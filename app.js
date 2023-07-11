const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./src/routes/index')
const resumeRouter = require('./src/routes/resume')
const loginRouter = require('./src/routes/login')
const {checkTokenMiddleware} = require('./src/auth')

const app = express()

const errorResponder = (error, request, response) => {
    response.header('Content-Type', 'application/json')
    const statusCode = error.statusCode || 500
    response.status(statusCode).json({statusCode: statusCode, errorMessage: error.message})
}
const invalidPathHandler = (request, response) => {
    response.status(404)
    response.json({statusCode: 404, errorMessage: 'path not found'})
}

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/resume', checkTokenMiddleware, resumeRouter)

app.use(errorResponder)
app.use(invalidPathHandler)

module.exports = app
