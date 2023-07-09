const Joi = require('joi')

const PHONE_NUMBER_PATTERN = /^\+[1-9]\d{1,14}$/ // E.164 standard for phone numbers

//max value is to limit the number of characters - for now it is given only for certain fields
const personalInformationSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
    phoneNumber: Joi.string().regex(PHONE_NUMBER_PATTERN).required(),
    linkedInUrl: Joi.string().required() // alternative - Joi.string().url().required()
});

const educationSchema = Joi.object({
    schoolName: Joi.string().required(),
    passingYear: Joi.string().required(),
    description: Joi.string().required()
})

const experienceSchema = Joi.object({
    companyName: Joi.string().required(),
    passingYear: Joi.string().required(),
    responsibilities: Joi.string().required()
})

const achievementsSchema = Joi.object({
    field: Joi.string().required(),
    awards: Joi.string().required()
})

const resumeSchema = Joi.object({
    templateId: Joi.string().max(50).required(),
    personalInformation: personalInformationSchema,
    jobTitle: Joi.string().max(50).required(),
    careerObjective: Joi.string().required(),
    skills: Joi.array().items(Joi.string()).required().min(1),
    education: Joi.array().items(educationSchema.required().min(1)).required(),
    experience: Joi.array().items(experienceSchema.required().min(1)).required(),
    achievements: Joi.array().items(achievementsSchema.required().min(1)).required(),
})

module.exports = resumeSchema;
