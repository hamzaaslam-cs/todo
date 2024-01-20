const mongoose = require('mongoose');
let softDelete = require('mongoosejs-soft-delete');
const {COMPLETED, TODO, IN_PROGRESS} = require('../enums/todo-statuses')

const {Schema} = mongoose;


const Todo = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: Number, required: true, enums: [COMPLETED, IN_PROGRESS, TODO], 'default': TODO},
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "user", required: true
    },
    deletedAt: {type: Date, default: null},
}, {timestamps: true});

Todo.plugin(softDelete)

module.exports = new mongoose.model("todo", Todo);