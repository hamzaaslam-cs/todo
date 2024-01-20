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

const deleteTodo  = async (_id) => {
    await Todo.removeOne({_id:_id});
};


module.exports = {createDto, updateTodo, restoreTodo,deleteTodo}