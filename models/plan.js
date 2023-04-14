var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');

var planSchema = mongoose.Schema({
    plan_name: {
        type : String,
        required : true
    },price: {
        type : String,
        required : true
    },
    isactive : {
        type : Number,
        required : true
    }
});
var Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;