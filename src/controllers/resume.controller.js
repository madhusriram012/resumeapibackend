const fs = require('fs');
const resumeService = require('../service/resume.service');
const newResume = async (req, res, next) => {
    try {
        const pdfPath = await resumeService.createResume(req.body)
        if (!fs.existsSync(pdfPath)) {
            console.error('Error in downloading the file. Path', pdfPath)
            res.status = 500
            res.json({statusCode: 500, errorMessage: 'INTERNAL_SERVER_ERROR'})
            next()
        }
        const data = fs.readFileSync(pdfPath);
        res.contentType("application/pdf");
        res.send(data);
    } catch (e) {
        next(e)
    }
};

module.exports = {newResume};
