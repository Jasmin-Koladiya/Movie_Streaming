var mongoose = require('mongoose');
var path = require('path');

var subscriptionschema = mongoose.Schema({
    userid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    planid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Plan',
        required : true
    },
    sdate : {
        type : String,
        required : true
    },
    edate : {
        type : String,
        required : true
    },
});

var subscription = mongoose.model('Subscription', subscriptionschema);

module.exports = subscription;