const Todo = require("../../models/Todo");
const {ValidationError} = require("joi");
const findTodoValidator = async (req, res, next) => {
    try {
        const todoId = req.params.todoId;
        const todo = await Todo.findOne({_id:todoId,userId:req.authUserId});
        if (empty(todo)) {
            throw new ValidationError('Invalid todoId');
        }

        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {findTodoValidator};