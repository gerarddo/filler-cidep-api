var express = require("express");
var router = express.Router();
var Cylinder = require("../models/scaffold/Cylinder")
var Point = require("../models/Point")



router.get("/", function(req, res){
    res.send("This is the filler api working")
}); //router.get

router.post("/fill", function(req, res){
	// console.log("post request at /fill");
    
	// const r = Number(req.body.r)
	// const step = Number(req.body.step)
	// const height = Number(req.body.height)
	// const heightStep = Number(req.body.heightStep)

    // var newCylinder = new Cylinder(r, step, height, heightStep).toCIDEPGcode(new Point(-30, 0 ,0), "F4")
    
    // res.render("index", {fill: true, cylinderGcode: newCylinder})
	let parameters = JSON.parse(req.body.parameters)
	const radius = Number(parameters.radius)
	const step = Number(parameters.step)
	const height = Number(parameters.height)
	const heightStep = Number(parameters.heightStep)
    var newlyCreated = new Cylinder(radius, step, height, heightStep).toCIDEPGcode(new Point(-30, 0 ,0), "F4")
	res.send(JSON.stringify(newlyCreated));
}); //router.post

module.exports = router;



