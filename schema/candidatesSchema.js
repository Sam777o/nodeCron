import Joi from "joi";
const candidatesSchema =  {
    create:Joi.object({
        userId:Joi.number().required(),
        partyId:Joi.number().required()
    }),
    delete:Joi.object({
        id:Joi.number().required()
    })
}

export default candidatesSchema