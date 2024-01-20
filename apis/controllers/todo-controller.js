const {StatusCodes} = require('http-status-codes')
const {createDto, updateTodo, restoreTodo, deleteTodo} = require("../../services/todo-service");

const store = async (req, res, next) => {
    try {
        await createDto(req.validated);
        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Data created successfully", {}));
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        await updateTodo(req.validated, req.params.todoId);

        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Records updated successfully", {}));
    } catch (e) {
        next(e);
    }
};

const restore = async (req, res, next) => {
    try {
        await restoreTodo(req.params.todoId);

        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Records restored successfully", {}));
    } catch (e) {
        next(e);
    }
};

const deleteTodos = async (req, res, next) => {
    try {
        await deleteTodo(req.params.todoId);
        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Records deleted successfully", {}));
    } catch (e) {
        next(e);
    }
};


module.exports = {store, update, restore, deleteTodos}