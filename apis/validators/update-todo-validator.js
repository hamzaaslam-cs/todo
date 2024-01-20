const Joi = require('joi');
const {COMPLETED, TODO, IN_PROGRESS} = require('../../enums/todo-statuses')
const Todo = require("../../models/Todo");
const {ValidationError} = require("joi");
const updateTodoValidator = async (req, res, next) => {
    try {
        const todoId = req.params.todoId;
        const todo = await Todo.findById(todoId);
        if (empty(todo)) {
            throw new ValidationError('Invalid todoId');
        }

        req.validated = {userId: req.authUserId}
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {updateTodoValidator};