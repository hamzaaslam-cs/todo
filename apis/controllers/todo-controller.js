const {StatusCodes} = require('http-status-codes')
const {createDto, updateDto} = require("../../services/todo-service");

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
        await updateDto(req.validated, req.params.todoId);

        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Records updated successfully", {}));
    } catch (e) {
        next(e);
    }
};


module.exports = {store,update}