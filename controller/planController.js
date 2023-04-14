
const Plan = require('../models/plan');
const User = require('../models/plan');
module.exports.user = function (req, res) {
    return res.render('dashboard');
}
module.exports.add_plan = function (req, res) {
    return res.render('add_plan');
}
module.exports.view_plan = async function (req, res) {
        var activedata = await Plan.find({isactive: 1});
        let deactivedata = await Plan.find({isactive : 0});
        return res.render('view_plan', {
        activedata: activedata,
        deactivedata: deactivedata
    })
} 
module.exports.insertData = async function (req,res) {
    Plan.create({
        plan_name: req.body.plan_name,
        price: req.body.price,
        isactive:1
    }, function(err){
        if(err) {
            console.log("Plan not add" +err);
            return false;
        }
        req.flash('success', ' Plan add succesfully..');
        return res.redirect('back');
    })
}
module.exports.searchingData = async (req, res) => {
    var activedata = await Plan.find({"plan_name" : new RegExp(req.body.search)});
    let deactivedata = await Plan.find({'isactive' : 0});
    return res.render('view_plan', {
        activedata: activedata,
        deactivedata: deactivedata
    })
}   
module.exports.delete_plan = function (req, res){
    var id = req.params.id;
    Plan.findByIdAndDelete(id, function (err,record){
        if (err){
            console.log("plan not deleted"+err);
            return false;
        }
        req.flash('success', ' Plan delete succesfully..');
        return res.redirect('back')
    })
}
module.exports.update_plan = function(req, res){
    Plan.findById(req.params.id, function(err, plan){
        if (err) {
            console.log("plan not update "+ err);
            return false;
        }
        return res.render("update_plan",{
            data : plan
        })
    })
}
module.exports.edite_plan = async function (req, res) {
   
    let data = await Plan.findByIdAndUpdate(req.body.id,req.body);
    if (data) {
            req.flash('success', ' Plan update succesfully..');
        return res.redirect('view_plan');
    }
    else {
        console.log('Error record not update');
    }
}
module.exports.activestatus = function(req, res){
    Plan.findByIdAndUpdate(req.params.id,{
        'isactive': 1
    },function(err,updateData){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    })
}

module.exports.deactivestatus = function(req, res){
    Plan.findByIdAndUpdate(req.params.id,{
        'isactive': 0
    },function(err,updateData){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    })
}