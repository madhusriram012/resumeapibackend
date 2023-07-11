const express = require('express')
const router = express.Router()
const resumeController = require('../controllers/resume.controller')
const Validator = require('../validators/validation.middleware')

router.post('/', Validator('resume'), resumeController.newResume)

module.exports = router
