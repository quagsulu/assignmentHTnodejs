import Joi from 'joi';

const productSchema = Joi.object({
    name: Joi.string().required().max(255).min(6),
    price: Joi.number().required().min(1),
    desc: Joi.string().required().max(255).min(6),
}).options({
    abortEarly : false
})

export default productSchema