const mongoose = require('mongoose');
const {COMPLETED, TODO, IN_PROGRESS} = require('../enums/todo-statuses')

const {Schema} = mongoose;

const Todo = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: Number, required: true, enums: [COMPLETED, IN_PROGRESS, TODO], 'default': TODO},
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "user", required: true
    }, // createdAt: {type: Date, default: Date.now()},
    // updatedAt: {type: Date, default: Date.now()},
    deletedAt: {type: Date, default: null},
}, {timestamps: true});

// // Query middleware to exclude soft-deleted documents by default
// Todo.pre('find', function () {
//     this.where({ deletedAt: { $ne: null } });
// });
// // Todo.pre('findOneAndUpdate', function () {
// //     this.where({ deletedAt: { $ne: null } });
// // });
// // Todo.pre('findOne', function () {
// //     this.where({ deletedAt: { $ne: null } });
// // });
//
// Todo.pre('findOne', async function() {
//     await Promise.resolve();
// });

// Export model
module.exports = new mongoose.model("todo", Todo);
