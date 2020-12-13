const Joi = require("@hapi/joi");

registerValidation = data => {
    const schema = {
        name: Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    }
    return Joi.validate(data, schema);
}

loginValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    }
    return Joi.validate(data, schema);
}

postsValidation = data => {
    const schema = {
        title: Joi.string().min(6).required(),
        description: Joi.string().min(6).required(),
    }
    return Joi.validate(data, schema);
}

postUpdateValidation = data => {
    const schema = {
        title: Joi.string().min(6).required(),
        description: Joi.string().min(6).required(),
        id: Joi.string().required(),
    }
    return Joi.validate(data, schema);
}

postDeleteValidation = data => {
    const schema = {
        id: Joi.string().required(),
    }
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postsValidation = postsValidation;
module.exports.postUpdateValidation = postUpdateValidation;
module.exports.postDeleteValidation = postDeleteValidation;
