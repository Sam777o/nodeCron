import Joi from "joi";

const UsersSchema = {
    create: Joi.object({
        firstName: Joi.string().alphanum().required().min(2),
        lastName: Joi.string().alphanum().required().min(2),
        middleName: Joi.string().alphanum().required(),
        passport: Joi.string().pattern(/^[a-z]{2}[0-9]{7}$/).required().alphanum()
    }),
    list: Joi.object({
        offset: Joi.number().min(0),
        limit: Joi.number().min(1)
    }),

    delete: Joi.object({
        id: Joi.number()
    }),

    authorization: Joi.object({
        passport: Joi.string().pattern(/^[a-z]{2}[0-9]{7}$/).required().alphanum()
    }),
    vote:Joi.object({
        token:Joi.string().alphanum().required(),
        candidateId: Joi.number().required()
    })
}

export default UsersSchema
