import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'
import { setResponseBody } from '../utils/responseFormatter'

const validateRequest = (schema: ObjectSchema) => {
    return (request: Request, response: Response, next: NextFunction): void => {
        const { error } = schema.validate(request.body)

        if (error) {
        response.status(400).send(setResponseBody(error.details[0].message, 'validation_error', null))
        return
        }

        next()
    }
}

export default validateRequest
