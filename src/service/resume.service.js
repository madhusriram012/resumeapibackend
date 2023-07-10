const helper = require('./helper.service');
const AdobeDocumentApi = require('./adobe.documentapi.service');
const CustomError = require('../routes/custom.error');
const fs = require('fs');
const createResume = async (jsonDataForMerge) => {
    const templatePath = 'resources/' + jsonDataForMerge.templateId + ".docx"
    
    if (!fs.existsSync(templatePath)) {
        throw new CustomError('template not found', 404)
    }
    try {
        let outputFilePath = helper.createOutputFilePath(jsonDataForMerge.personalInformation.name);
        await AdobeDocumentApi.generatePdf(jsonDataForMerge, templatePath, outputFilePath)
        return outputFilePath
    } catch (err) {
        console.log('Exception encountered while executing operation', err);
        throw new Error(err)
    }
};

module.exports = {createResume};
