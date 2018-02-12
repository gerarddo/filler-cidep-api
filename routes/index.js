var express = require("express");
var router = express.Router();
var Cylinder = require("../models/scaffold/Cylinder")
var Point = require("../models/Point")



router.get("/", function(req, res){
    res.render("index", {fill: false})
}); //router.get

router.post("/fill", function(req, res){
	console.log("post request at /fill");
    
	const r = Number(req.body.r)
	const step = Number(req.body.step)
	const height = Number(req.body.height)
	const heightStep = Number(req.body.heightStep)

	// console.log("r type is" + typeof r)

    var newCylinder = new Cylinder(r, step, height, heightStep).toCIDEPGcode(new Point(-30, 0 ,0), "F4")
    
    res.render("index", {fill: true, cylinderGcode: newCylinder})



    // User.register(newUser, req.body.password, function(err, user){
    //     if(err){
    //         console.log(err);
    //         return res.render("register");
    //     }
    //     console.log("new user created");
    //     console.log(newUser)
    //     passport.authenticate("local")(req, res, function(){
    //         res.redirect("/");
    //     }); //Passport.authenticate
    // }); //User.register
}); //router.post

module.exports = router;


