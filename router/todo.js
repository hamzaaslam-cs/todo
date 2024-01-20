const express = require("express");
const router = express.Router();
const {asyncWrap} = require("../utils/asyncWrapper");
const {store,update} = require('../apis/controllers/todo-controller')
const verifyToken = require('../middlewares/auth-middleware');
const {storeTodoValidator} = require('../apis/validators/store-todo-validator');
const {updateTodoValidator} = require('../apis/validators/update-todo-validator');

router.post("/", verifyToken,storeTodoValidator, asyncWrap(store));
router.put("/:todoId", verifyToken,updateTodoValidator, asyncWrap(update));

module.exports = router;
