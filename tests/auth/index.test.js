const httpMocks = require('node-mocks-http')
const jwt = require('jsonwebtoken')
const config = require('config')
const {checkTokenMiddleware} = require('../../src/auth')

const secret = config.get('jwt.secret')

describe('Auth middleware', () => {
    it('should return 401 when no token is provided', () => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse()
        const next = jest.fn(() => null)

        checkTokenMiddleware(req, res, next)

        expect(res.statusCode).toEqual(401)
        expect(res._isJSON()).toBeTruthy()
        expect(res._isJSON()).toBeTruthy()
        const response = res._getJSONData()
        expect(response.message).toEqual('unauthorized')
        expect(next.mock.calls).toHaveLength(0)
    })

    it('should return 401 when token is invalid', () => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse()
        req.headers.authorization = 'bearer 123'
        const next = jest.fn(() => null)

        checkTokenMiddleware(req, res, next)

        expect(res.statusCode).toEqual(401)
        expect(res._isJSON()).toBeTruthy()
        expect(res._isJSON()).toBeTruthy()
        const response = res._getJSONData()
        expect(response.message).toEqual('bad token')
        expect(next.mock.calls).toHaveLength(0)
    })

    it('should call next for valid token', () => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse()
        req.headers.authorization = `bearer ${jwt.sign(
            {
                username: 'test',
            },
            secret,
            {expiresIn: '6 hours'},
        )}`

        const next = jest.fn(() => null)

        checkTokenMiddleware(req, res, next)

        expect(next.mock.calls).toHaveLength(1)
    })
})
