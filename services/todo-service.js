const Todo = require("../models/Todo");
const createDto = async (data) => {

    let todo = await Todo.create(
        data
    );

    return todo;
};

const updateDto = async (data,_id) => {

    let todo = await Todo.findOneAndUpdate({_id},
        data
    );

    return todo;
};


module.exports = {createDto,updateDto}