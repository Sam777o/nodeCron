import Joi from "joi";

const partiesSchema = {
    create:Joi.object({
        name: Joi.string().required().alphanum()
    }),
    delete: Joi.object({
        id:Joi.number().required()
    })
}

export default partiesSchema