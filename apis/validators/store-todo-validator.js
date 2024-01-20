const Joi = require('joi');
const {COMPLETED, TODO, IN_PROGRESS} = require('../../enums/todo-statuses')
const storeTodoValidator = async (req, res, next) => {
    try {

        const schema = Joi.object({
            title: Joi.string().max(32).required(),
            description: Joi.string().required(),
            status: Joi.any().valid(IN_PROGRESS, TODO, COMPLETED).default(TODO),

        })
        req.validated = await schema.validateAsync(req.body);
        req.validated = {...req.validated, userId: req.authUserId}
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {storeTodoValidator};