const Todo = require("../models/Todo");
const createDto = async (data) => {

    let todo = await Todo.create(data);

    return todo;
};

const updateTodo = async (data, _id) => {

    let todo = await Todo.findOneAndUpdate({_id}, data);
    return todo;
};

const restoreTodo = async (_id) => {
    let todo = await Todo.findOneDeleted({_id: _id})
    todo.deleted = false;
    todo.deletedAt = null;
    await todo.save();
};

const deleteTodo = async (_id) => {
    await Todo.removeOne({_id: _id});
};

const getUserTodos = async (userId, paginate = {}) => {


    let totalTodos = await Todo.countDocuments({userId: userId});

    let todos = await Todo.find({userId: userId})
        .limit(paginate.limit * 1)
        .skip((paginate.page - 1) * paginate.limit)
        .exec();

    return {
        todos, extras: {totalPages: Math.ceil(totalTodos / paginate.limit), currentPage: paginate.page}
    };
};

const findUserTodo = async (_id, userId) => {
    return await Todo.findOne({_id: _id, userId: userId});
};


module.exports = {createDto, updateTodo, restoreTodo, deleteTodo, getUserTodos, findUserTodo}