import Joi from "joi";

export const matchSchema = Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required()
})

