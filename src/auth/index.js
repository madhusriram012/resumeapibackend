const jwt = require('jsonwebtoken')
const config = require('config')

const secret = config.get('jwt.secret')

const extractBearerToken = (headerValue) => {
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
        return res.status(401).json({message: 'unauthorized'})
    }

    jwt.verify(token, secret, (err) => {
        if (err) {
            return res.status(401).json({message: 'bad token'})
        }
        next()
    })
}

module.exports = {checkTokenMiddleware}
