const express = require("express");
const router = express.Router();
const {asyncWrap} = require("../utils/asyncWrapper");
const {store, update, restore, deleteTodos} = require('../apis/controllers/todo-controller')
const verifyToken = require('../middlewares/auth-middleware');
const {storeTodoValidator} = require('../apis/validators/store-todo-validator');
const {updateTodoValidator} = require('../apis/validators/update-todo-validator');
const {restoreTodoValidator} = require("../apis/validators/restore-todo-validator");
const {deleteTodoValidator} = require("../apis/validators/delete-todo-validator");

router.post("/", verifyToken, storeTodoValidator, asyncWrap(store));
router.put("/:todoId", verifyToken, updateTodoValidator, asyncWrap(update));
router.get("/restore/:todoId", verifyToken, restoreTodoValidator, asyncWrap(restore));
router.delete("/:todoId", verifyToken, deleteTodoValidator, asyncWrap(deleteTodos));

module.exports = router;
