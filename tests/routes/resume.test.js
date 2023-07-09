let request = require('supertest')
const validData = require('../utils/mock.data')
const app = require('../../app')
const jwt = require('jsonwebtoken')

jest.mock('../../src/service/helper.service', () => {
    return {
        createOutputFilePath: jest.fn(() => 'tests/resources/test.pdf')
    };
});

jest.mock('fs', () => {
    const fs = jest.requireActual('fs')
    return {
        ...fs,
        existsSync: jest.fn(() => true)
    };
});

jest.mock('../../src/service/adobe.documentapi.service', () => {
    return {
        generatePdf: jest.fn(() => null)
    };
});

jest.mock('jsonwebtoken', () => ({
    ...jest.requireActual('jsonwebtoken'), // import and retain the original functionalities
    verify: jest.fn().mockReturnValue({ foo: 'bar' }), // overwrite verify
}));

describe('Resume route', () => {
    it('should post the resume object and download the file', function () {
        return request(app).post('/resume/').set('authorization', 'bearer abc123').send(validData).expect(200).then((resp) => {
            expect(resp.headers['content-type']).toEqual('application/pdf')
        });
    });

    it('should return 400 error posting the resume object if the data is invalid', function () {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.templateId
        return request(app).post('/resume/').set('authorization', 'bearer abc123').send(copyData).expect(400)
    });

    it('should return 401 if unauthorized', function () {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.templateId
        return request(app).post('/resume/').send(copyData).expect(401)
    });
})
