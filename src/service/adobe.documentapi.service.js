const Adobe = require('./adobe.execution.service')
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk')
const generatePdf = async (jsonDataForMerge, templatePath, outputFilePath) => {
    const executionContext = Adobe.getAdobeExecutionContext()

    const documentMerge = PDFServicesSdk.DocumentMerge,
        documentMergeOptions = documentMerge.options,
        options = new documentMergeOptions.DocumentMergeOptions(
            jsonDataForMerge,
            documentMergeOptions.OutputFormat.PDF,
        )

    // Create a new operation instance using the options instance
    const documentMergeOperation = documentMerge.Operation.createNew(options)

    // Set operation input document template from a source file.
    const input = PDFServicesSdk.FileRef.createFromLocalFile(templatePath)
    documentMergeOperation.setInput(input)

    await documentMergeOperation
        .execute(executionContext)
        .then(async (result) => {
            await result.saveAsFile(outputFilePath)
        })
        .catch((err) => {
            if (
                err instanceof PDFServicesSdk.Error.ServiceApiError ||
                err instanceof PDFServicesSdk.Error.ServiceUsageError
            ) {
                console.log('Exception encountered while executing operation', err)
            } else {
                console.log('Exception encountered while executing operation', err)
            }
            throw new Error(err)
        })
}

module.exports = {generatePdf}
