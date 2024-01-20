const todoDto=require('../dtos/todo-dto');
module.exports = (data, pagination = {}) => {
    let todos= data.map((value)=> {
        return todoDto(value)
    })
    // extras=Object.values(extras);
    return {todos,pagination};
};