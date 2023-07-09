const service = require('../../src/service/resume.service')
const validData = require('../utils/mock.data')

jest.mock('../../src/service/adobe.documentapi.service', () => {
    return {
        generatePdf: jest.fn(() => null)
    };
});

describe('Resume Service', () => {
    it('should throw error if template is not found', async function () {
        await service.createResume(validData).catch(err => expect(err.statusCode).toEqual(404))
    });

    it('should give outputPath if download is success', async function () {
        const copyData = JSON.parse(JSON.stringify(validData))
        copyData.templateId = "LinkTemplate"

        expect(await service.createResume(copyData)).toContain("output/resume-test")
    });
})
