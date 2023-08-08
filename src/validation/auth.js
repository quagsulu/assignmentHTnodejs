import Joi from "joi";

export const signUpValidator = Joi.object({
    userName: Joi.string().required().max(255).min(6),
    email: Joi.string().required().email(),
    password: Joi.string().required().max(255).min(6),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    role: Joi.string()
})
export const signInValidator = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().max(255).min(6),
})

