const app = require('./app')

const server = app.listen(8081, () => {
    console.log('Server running on port 8081')
})

module.exports = server
