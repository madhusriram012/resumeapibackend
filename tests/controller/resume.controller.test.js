const controller = require('../../src/controllers/resume.controller')
const httpMocks = require('node-mocks-http');

jest.mock('../../src/service/adobe.documentapi.service', () => {
    return {
        generatePdf: jest.fn(() => null)
    };
});


jest.mock('../../src/service/resume.service', () => {
    return {
        createResume: jest.fn(() => 'tests/resources/test.pdf')
    };
});

describe('Resume Controller', () => {
    it('should send 200 if the request is correct', function () {
        let req = httpMocks.createRequest();
        let res = httpMocks.createResponse();

        controller.newResume(req, res)

        expect(res.statusCode).toEqual(200);
        expect(res._isJSON()).toEqual(false);
    });
})
