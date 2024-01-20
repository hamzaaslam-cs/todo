const mongoose = require('mongoose') ;

const {Schema} = mongoose;

const User = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
    deletedAt: {type: Date, default: null},
});

// Virtual for book's URL

// Export model
module.exports =new mongoose.model("User", User);
