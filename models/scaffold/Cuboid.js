// var functions = require("../../libraries/functions")
var approx = require("../../tools/approx")
// var math = require("../../tools/math")
// var Point = require("../Point")
// var Polygon = require("../Polygon")
var Plank = require("../Plank")
var Scaffold = require("../Scaffold")
var Square = require("../polygon/Square")


class Cuboid extends Scaffold {
	constructor(side, step, height, heightStep){

		let planks = getCuboidPlanks(side, step, height, heightStep)
		super(planks, heightStep)
	}
}


module.exports = Cuboid


function getCuboidPlanks(side, step, height, heightStep){

	var numOfPlanks = approx.round(height/heightStep)
	var currentHeight = 0
	var planks = []
	var orientation = "vertical"

	for(var i = 0; i < numOfPlanks; i++){

		let currentSquare = new Square(side, currentHeight)

		console.log("current square is")
		console.log(currentSquare)
	
		let currentPlank = new Plank(currentSquare, step, orientation)

		console.log("current plank is")
		console.log(currentPlank)

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
