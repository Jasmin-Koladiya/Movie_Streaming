var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Plan',
        require: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
var user = mongoose.model('User', userSchema);
module.exports = user;