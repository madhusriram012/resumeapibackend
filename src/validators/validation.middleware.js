const createHttpError = require('http-errors')
//* Include all validators
const Validators = require('./index')

module.exports = function (validator) {
    //! If validator is not exist, throw err
    // eslint-disable-next-line no-prototype-builtins
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async function (req, res, next) {
        try {
            req.body = await Validators[validator].validate(req.body)
            next()
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 400. Otherwise HTTP 500
            if (err.isJoi)
                return next(createHttpError(400, {statusCode: 400, message: err.message}))
            next(createHttpError(500))
        }
    }
}
