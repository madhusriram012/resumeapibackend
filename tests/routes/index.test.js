let request = require('supertest')
const app = require('../../app')

describe('Index route', () => {
    it('should get the server status data', function () {
        return request(app).get('/').expect(200).then((resp) => expect(resp.body.status).toEqual('running'))
    });
})
