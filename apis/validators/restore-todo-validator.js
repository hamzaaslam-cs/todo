const Joi = require('joi');
const {COMPLETED, TODO, IN_PROGRESS} = require('../../enums/todo-statuses')
const Todo = require("../../models/Todo");
const {ValidationError} = require("joi");
const restoreTodoValidator = async (req, res, next) => {
    try {
        const todoId = req.params.todoId;
        const todo = await Todo.findOneDeleted({_id:todoId});
        if (empty(todo)) {
            throw new ValidationError('Invalid todoId');
        }

        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {restoreTodoValidator};