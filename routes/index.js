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

router.get("/simulator-test", function(req, res){
    res.render("simulator-test")
}); //router.get

router.post("/fill", function(req, res){
	let step = 0;
	let height = 0;
	let heightStep = 0;
	let newlyCreated = {};
	let parameters = JSON.parse(req.body.parameters)
	const polygonCase = parameters.polygonCase
	switch(polygonCase) {
    case "circle":
		let radius = Number(parameters.radius)
		step = Number(parameters.step)
		height = Number(parameters.height)
		heightStep = Number(parameters.heightStep)
		newlyCreated = new Cylinder(radius, step, height, heightStep)
        break;
    case "square":
		let side = Number(parameters.side)
		step = Number(parameters.step)
		height = Number(parameters.height)
		heightStep = Number(parameters.heightStep)
		newlyCreated = new Cuboid(side, step, height, heightStep)
        break;
	}
	let CIDEPGcode = newlyCreated.toCIDEPGcode("F4")
	let Gcode = newlyCreated.toGcode()
	let output = {
		CIDEPGcode: CIDEPGcode,
		Gcode: Gcode,
		info: {
			planks: newlyCreated._associatedPlanks.length,
			area: newlyCreated._area,
			volume: newlyCreated._volume,
			length: newlyCreated._length
		}
	}
	res.send(JSON.stringify(output));
	text.saveString(Gcode, "public/web/examples/current/normal.gcode")
	text.saveString(CIDEPGcode, "public/web/examples/current/CIDEP.gcode")
}); //router.post

module.exports = router;



