const {StatusCodes} = require('http-status-codes')
const {
    createDto,
    updateTodo,
    restoreTodo,
    deleteTodo,
    findUserTodo,
    getUserTodos
} = require("../../services/todo-service");
const todoDto=require('../dtos/todo-dto');
const todoDtos=require('../dtos/todos-dto');

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

const index = async (req, res, next) => {
    try {
        const { page = 1, limit = 2 } = req.query;
        let todos = await getUserTodos(req.authUserId,{page,limit});
        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Records found successfully",todoDtos(todos.todos,todos.extras)));
    } catch (e) {
        next(e);
    }
};

const find = async (req, res, next) => {
    try {
        let todo = await findUserTodo(req.params.todoId, req.authUserId);
        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Record found successfully", todoDto(todo)));
    } catch (e) {
        next(e);
    }
};


module.exports = {store, update, restore, deleteTodos, index, find}