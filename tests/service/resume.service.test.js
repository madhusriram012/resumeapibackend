const {generatePdf} = require('../../src/service/adobe.documentapi.service')
const service = require('../../src/service/resume.service')
const validData = require('../utils/mock.data')

jest.mock('../../src/service/adobe.documentapi.service', () => {
    return {
        generatePdf: jest.fn(() => null),
    }
})

describe('Resume Service', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    it('should throw error if template is not found', async () => {
        await service.createResume(validData).catch((err) => expect(err.statusCode).toEqual(404))
    })

    it('should throw error if generatePdf fails', async () => {
        generatePdf.mockImplementation(() => Promise.reject('error'))
        await service.createResume(validData).catch((err) => expect(err.message).toEqual('error'))
    })

    it('should give outputPath if download is success', async () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        copyData.templateId = '1'

        expect(await service.createResume(copyData)).toContain('output/resume-test')
    })
})
