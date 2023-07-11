const controller = require('../../src/controllers/resume.controller')
const httpMocks = require('node-mocks-http')
const {createResume} = require('../../src/service/resume.service')

jest.mock('../../src/service/adobe.documentapi.service', () => {
    return {
        generatePdf: jest.fn(() => null),
    }
})

jest.mock('../../src/service/resume.service', () => {
    return {
        createResume: jest.fn(),
    }
})

describe('Resume Controller', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should send 200 if the request is correct', async () => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse()
        createResume.mockImplementation(() => 'tests/resources/test.pdf')
        await controller.newResume(req, res, jest.fn())

        expect(res.statusCode).toEqual(200)
        expect(res._isJSON()).toBeFalsy()
    })

    it('should send 500 if output path is not present', async () => {
        createResume.mockImplementation(() => '')
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse()

        await controller.newResume(req, res, jest.fn())

        expect(res.statusCode).toEqual(500)
    })
})
