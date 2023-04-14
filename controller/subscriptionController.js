const User = require('../models/user');
const Plan = require('../models/plan')
const Subscription = require('../models/subscription');
module.exports.user = function (req, res) {
        Plan.find({}, function (err, plan) {
            if (err) {
                console.log(err);
            }
            console.log(plan);
            return res.render('add_sub', {
                'plan': plan
            });
        })    
}

module.exports.subdata = async function (req, res) {
    var user = await User.find({'plan':req.body.planid})
    return res.render('planoption', {
                 'subData': user
           })
}

module.exports.insertData = async function (req, res) {
    let data = await Subscription.create(req.body);
    if (data) {
        req.flash('success', ' Subscription add succesfully..');
        return res.redirect('view_sub');
    }
    else {
        console.log('Error record not add');
    }
}
module.exports.view_sub = async (req, res) => {
    let data = await Subscription.find({}).populate('userid').populate('planid').exec();
    return res.render('view_sub', {
        data: data
    });
}

module.exports.delete_sub = async function (req, res) {
    const id = req.params.id;
    const record = await Subscription.findByIdAndDelete(id);
    if (record) {
        req.flash('success', ' Subscription delete succesfully..');
        
      return res.redirect('back');
    }
    console.log('User not found');
    return res.status(404).send('User not found');
  };
  

module.exports.update_sub = function (req, res) {
    Subscription.findById(req.params.id, function(err, data){
        if (err) {
            console.log("plan not update "+ err);
            return false;
        }
        return res.render("update_sub",{
            i : data
        })
    })
}

module.exports.edite_sub = async function (req, res) {
    let data = await Subscription.findByIdAndUpdate(req.body.id,req.body);
    if (data) {
        req.flash('success', ' Subscription update succesfully..');

        return res.redirect('view_sub');
    }
    else {
        console.log('Error record not update');
    }
}