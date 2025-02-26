import Joi from "joi";


export const rideSchema = Joi.object({
    pickup: Joi.string().min(3).required(),
    destination: Joi.string().min(3).required(),
    fare: Joi.number().required()
})