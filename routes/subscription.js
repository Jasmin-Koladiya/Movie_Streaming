const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
const path = require("path")
var routes = express.Router();
var subscriptionController = require("../controller/subscriptionController");
var UserController = require("../controller/userController"); 
routes.get("/add_sub",passport.checkAuthenticon, subscriptionController.user);
routes.post('/subdata',passport.checkAuthenticon,subscriptionController.subdata);
routes.post('/insertData',passport.checkAuthenticon,subscriptionController.insertData)
routes.get("/view_sub",passport.checkAuthenticon, subscriptionController.view_sub);
routes.get('/delete_sub/:id',passport.checkAuthenticon,subscriptionController.delete_sub)
routes.get('/update_sub/:id',passport.checkAuthenticon,subscriptionController.update_sub)   
routes.post('/edite_sub',passport.checkAuthenticon,subscriptionController.edite_sub)
routes.get( "/updatepassword",passport.checkAuthenticon,UserController.updatepassword)
module.exports = routes;
