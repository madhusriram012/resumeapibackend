const config = require('config');
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk')

const clientId = config.get('adobeClientConfig.client_id');
const clientSecret = config.get('adobeClientConfig.client_secret');
class Adobe {
    static getAdobeExecutionContext() {
        const credentials =  PDFServicesSdk.Credentials
            .servicePrincipalCredentialsBuilder()
            .withClientId(clientId)
            .withClientSecret(clientSecret)
            .build();


        return PDFServicesSdk.ExecutionContext.create(credentials);
    }
}
module.exports = Adobe
