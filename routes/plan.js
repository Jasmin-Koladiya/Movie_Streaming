const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
const path = require("path")
var routes = express.Router();
var UserController = require("../controller/userController");
var PlanController = require("../controller/planController");
routes.get("/", passport.checkAuthenticon,PlanController.user);
routes.get("/add_plan",passport.checkAuthenticon, PlanController.add_plan);
routes.get("/view_plan",passport.checkAuthenticon, PlanController.view_plan);
routes.post("/insertData",passport.checkAuthenticon, PlanController.insertData);
routes.post('/searchingData',passport.checkAuthenticon,PlanController.searchingData)
routes.get('/deactivestatus/:id',passport.checkAuthenticon,PlanController.deactivestatus)
routes.get('/delete_plan/:id',passport.checkAuthenticon,PlanController.delete_plan)
routes.get('/update_plan/:id',passport.checkAuthenticon,PlanController.update_plan)   
routes.post('/edite_plan',passport.checkAuthenticon,PlanController.edite_plan)
routes.get('/activestatus/:id',passport.checkAuthenticon,PlanController.activestatus)
routes.get( "/updatepassword",passport.checkAuthenticon,UserController.updatepassword)
module.exports = routes;
