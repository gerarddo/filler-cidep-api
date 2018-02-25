var express = require("express");
var router = express.Router();
var Cylinder = require("../models/scaffold/Cylinder")
var Cuboid = require("../models/scaffold/Cuboid")
var Point = require("../models/Point")
var text = require("../tools/text")



router.get("/", function(req, res){
    res.send("This is the filler api working")
}); //router.get


router.get("/simulator", function(req, res){
    res.render("simulator")
}); //router.get


router.post("/fill", function(req, res){
	// console.log("post request at /fill");
    
	// const r = Number(req.body.r)
	// const step = Number(req.body.step)
	// const height = Number(req.body.height)
	// const heightStep = Number(req.body.heightStep)

    // var newCylinder = new Cylinder(r, step, height, heightStep).toCIDEPGcode(new Point(-30, 0 ,0), "F4")
    
    // res.render("index", {fill: true, cylinderGcode: newCylinder})

	let step = 0;
	let height = 0;
	let heightStep = 0;
	let newlyCreated = {};
	let CIDEPGcode = ""
	let Gcode = ""



	let parameters = JSON.parse(req.body.parameters)

	const polygonCase = parameters.polygonCase

	switch(polygonCase) {
    case "circle":
		let radius = Number(parameters.radius)
		step = Number(parameters.step)
		height = Number(parameters.height)
		heightStep = Number(parameters.heightStep)
		newlyCreated = new Cylinder(radius, step, height, heightStep)
		CIDEPGcode = newlyCreated.toCIDEPGcode(new Point(-30, 0 ,0), "F4")
		Gcode = newlyCreated.toGcode()
		res.send(JSON.stringify(CIDEPGcode));
        break;
    case "square":
		let side = Number(parameters.side)
		step = Number(parameters.step)
		height = Number(parameters.height)
		heightStep = Number(parameters.heightStep)
		newlyCreated = new Cuboid(side, step, height, heightStep)
		CIDEPGcode = newlyCreated.toCIDEPGcode(new Point(-30, 0 ,0), "F4")
		Gcode = newlyCreated.toGcode()
		res.send(JSON.stringify(CIDEPGcode));
        break;
	}

	text.saveString(Gcode, "public/web/examples/current.gcode")

}); //router.post

module.exports = router;



