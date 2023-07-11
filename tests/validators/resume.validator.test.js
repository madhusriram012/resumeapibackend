const resumeSchema = require('../../src/validators/resume.validator')
const validData = require('../utils/mock.data')

describe('Resume validator', () => {
    it('should not throw error for valid data', () => {
        expect(resumeSchema.validate(validData).error).toBeNull()
    })

    it('should throw error if name is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.personalInformation.name
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "personalInformation" fails because [child "name" fails because ["name" is required]]',
        )
    })

    it('should throw error if lastName is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.personalInformation.lastName
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "personalInformation" fails because [child "lastName" fails because ["lastName" is required]]',
        )
    })

    it('should throw error if emailAddress is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.personalInformation.emailAddress
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "personalInformation" fails because [child "emailAddress" fails because ["emailAddress" is required]]',
        )
    })

    it('should throw error if emailAddress is not valid', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        copyData.personalInformation.emailAddress = 'xyz'
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "personalInformation" fails because [child "emailAddress" fails because ["emailAddress" must be a valid email]]',
        )
    })

    it('should throw error if phoneNumber is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.personalInformation.phoneNumber
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "personalInformation" fails because [child "phoneNumber" fails because ["phoneNumber" is required]]',
        )
    })

    it('should throw error if phoneNumber is not valid', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        copyData.personalInformation.phoneNumber = '123'
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "personalInformation" fails because [child "phoneNumber" fails because ["phoneNumber" with value "123" fails to match the required pattern: /^\\+[1-9]\\d{1,14}$/]]',
        )
    })

    it('should throw error if linkedInUrl is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.personalInformation.linkedInUrl
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "personalInformation" fails because [child "linkedInUrl" fails because ["linkedInUrl" is required]]',
        )
    })

    it('should throw error if templateId is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.templateId
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "templateId" fails because ["templateId" is required]',
        )
    })

    it('should throw error if jobTitle is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.jobTitle
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "jobTitle" fails because ["jobTitle" is required]',
        )
    })

    it('should throw error if careerObjective is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.careerObjective
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "careerObjective" fails because ["careerObjective" is required]',
        )
    })

    it('should throw error if skills is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.skills
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "skills" fails because ["skills" is required]',
        )
    })

    it('should throw error if skills does not have value', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        copyData.skills = []
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "skills" fails because ["skills" must contain at least 1 items]',
        )
    })

    it('should throw error if education is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.education
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "education" fails because ["education" is required]',
        )
    })

    it('should throw error if education does not have value', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        copyData.education = []
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "education" fails because ["education" does not contain 1 required value(s)]',
        )
    })

    it('should throw error if education does not have schoolName field', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.education[0].schoolName
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "education" fails because ["education" at position 0 fails because [child "schoolName" fails because ["schoolName" is required]]]',
        )
    })

    it('should throw error if education does not have passing year field', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.education[0].passingYear
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "education" fails because ["education" at position 0 fails because [child "passingYear" fails because ["passingYear" is required]]]',
        )
    })

    it('should throw error if education does not have description field', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.education[0].description
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "education" fails because ["education" at position 0 fails because [child "description" fails because ["description" is required]]]',
        )
    })

    it('should throw error if experience is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.experience
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "experience" fails because ["experience" is required]',
        )
    })

    it('should throw error if experience does not have value', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        copyData.experience = []
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "experience" fails because ["experience" does not contain 1 required value(s)]',
        )
    })

    it('should throw error if experience does not have companyName field', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.experience[0].companyName
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "experience" fails because ["experience" at position 0 fails because [child "companyName" fails because ["companyName" is required]]]',
        )
    })

    it('should throw error if experience does not have passing year field', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.experience[0].passingYear
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "experience" fails because ["experience" at position 0 fails because [child "passingYear" fails because ["passingYear" is required]]]',
        )
    })

    it('should throw error if experience does not have responsibilities field', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.experience[0].responsibilities
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "experience" fails because ["experience" at position 0 fails because [child "responsibilities" fails because ["responsibilities" is required]]]',
        )
    })

    it('should throw error if achievements is not found', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.achievements
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "achievements" fails because ["achievements" is required]',
        )
    })

    it('should throw error if achievements does not have value', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        copyData.achievements = []
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "achievements" fails because ["achievements" does not contain 1 required value(s)]',
        )
    })

    it('should throw error if achievements does not have field', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.achievements[0].field
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "achievements" fails because ["achievements" at position 0 fails because [child "field" fails because ["field" is required]]]',
        )
    })

    it('should throw error if achievements does not have awards field', () => {
        const copyData = JSON.parse(JSON.stringify(validData))
        delete copyData.achievements[0].awards
        expect(resumeSchema.validate(copyData).error.toString()).toEqual(
            'ValidationError: child "achievements" fails because ["achievements" at position 0 fails because [child "awards" fails because ["awards" is required]]]',
        )
    })
})
