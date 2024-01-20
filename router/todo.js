const express = require("express");
const router = express.Router();
const {asyncWrap} = require("../utils/asyncWrapper");
const {store, update, restore, deleteTodos, index, find} = require('../apis/controllers/todo-controller')
const verifyToken = require('../middlewares/auth-middleware');
const {storeTodoValidator} = require('../apis/validators/store-todo-validator');
const {updateTodoValidator} = require('../apis/validators/update-todo-validator');
const {restoreTodoValidator} = require("../apis/validators/restore-todo-validator");
const {deleteTodoValidator} = require("../apis/validators/delete-todo-validator");
const {findTodoValidator} = require("../apis/validators/find-todo-validator");

router.get("/", verifyToken, asyncWrap(index));
router.post("/", verifyToken, storeTodoValidator, asyncWrap(store));
router.get("/:todoId", verifyToken, findTodoValidator, asyncWrap(find));
router.put("/:todoId", verifyToken, updateTodoValidator, asyncWrap(update));
router.delete("/:todoId", verifyToken, deleteTodoValidator, asyncWrap(deleteTodos));
router.get("/restore/:todoId", verifyToken, restoreTodoValidator, asyncWrap(restore));

module.exports = router;
