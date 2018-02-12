// var functions = require("../../libraries/functions")
var approx = require("../../tools/approx")
// var math = require("../../tools/math")
// var Point = require("../Point")
// var Polygon = require("../Polygon")
var Plank = require("../Plank")
var Scaffold = require("../Scaffold")
var Circle = require("../polygon/Circle")


class Cylinder extends Scaffold {
	constructor(r, step, height, heightStep){

		let planks = getCylinderPlanks(r, step, height, heightStep)
		super(planks, heightStep)
	}
}


module.exports = Cylinder


function getCylinderPlanks(r, step, height, heightStep){

	var numOfPlanks = approx.round(height/heightStep)
	var currentHeight = 0
	var planks = []
	var orientation = "vertical"

	for(var i = 0; i < numOfPlanks; i++){

		let currentCircle = new Circle(r, 10, currentHeight)
	
		let currentPlank = new Plank(currentCircle, step, orientation)
		planks.push(currentPlank)

		currentHeight += heightStep
		if(orientation === "vertical"){
			orientation = "horizontal"
		} else {
			orientation = "vertical"
		}
	}
	return planks
}
