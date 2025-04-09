import Joi, { ObjectSchema } from 'joi'

const amountRegex = /^\d{1,2}(\.\d{1,2})?$/

const jobSchema: ObjectSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Job title is required',
            'string.min': 'Job title must be at least 2 characters',
            'string.max': 'Job title must be no longer than 100 characters',
        }),

    companyName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Company name is required',
            'string.min': 'Company name must be at least 2 characters',
            'string.max': 'Company name must be no longer than 100 characters',
        }),

    location: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Location is required',
        }),

    jobType: Joi.string()
        .valid('Full Time', 'Part Time', 'Internship', 'Contract')
        .required()
        .messages({
            'any.only': 'Job type must be one of Full Time, Part Time, Internship, or Contract',
            'string.empty': 'Job type is required',
        }),

    salaryMin: Joi.string()
        .pattern(amountRegex)
        .required()
        .messages({
            'string.empty': 'Minimum salary is required',
            'string.pattern.base': 'Invalid minimum salary format',
        }),

    salaryMax: Joi.string()
        .pattern(amountRegex)
        .required()
        .messages({
            'string.empty': 'Maximum salary is required',
            'string.pattern.base': 'Invalid maximum salary format',
        }),

    applicationDeadline: Joi.date()
        .greater('now')
        .required()
        .messages({
            'date.greater': 'Application deadline must be a future date',
            'date.base': 'Invalid date format',
            'any.required': 'Application deadline is required',
        }),

    description: Joi.string()
        .trim()
        .min(20)
        .max(2000)
        .required()
        .messages({
            'string.empty': 'Job description is required',
            'string.min': 'Job description must be at least 20 characters',
            'string.max': 'Job description must be no longer than 2000 characters',
        }),
}).custom((value, helpers) => {
    const min = parseFloat(value.salaryMin)
    const max = parseFloat(value.salaryMax)
    if (max <= min) {
        return helpers.error('any.custom', { message: 'Maximum salary must be greater than minimum salary' })
    }
    return value
})

export {
    jobSchema
}
