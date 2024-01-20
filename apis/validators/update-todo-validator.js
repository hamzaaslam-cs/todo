const Joi = require('joi');
const {COMPLETED, TODO, IN_PROGRESS} = require('../../enums/todo-statuses')
const Todo = require("../../models/Todo");
const {ValidationError} = require("joi");
const updateTodoValidator = async (req, res, next) => {
    try {
        const todoId = req.params.todoId;
        console.log(todoId);
        const todo = await Todo.findById(todoId);
        console.log(todo);
        if (empty(todo)) {
            throw new ValidationError('Invalid todoId');
        }
        const schema = Joi.object({
            title: Joi.string().max(32),
            description: Joi.string(),
            status: Joi.any().valid(IN_PROGRESS, TODO, COMPLETED).default(TODO),
        })
        req.validated = await schema.validateAsync(req.body);
        req.validated = {...req.validated, user_id: req.authUserId}
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {updateTodoValidator};