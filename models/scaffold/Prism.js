// var functions = require("../../libraries/functions")
var approx = require("../../tools/approx")
// var math = require("../../tools/math")
// var Point = require("../Point")
// var Polygon = require("../Polygon")
var Plank = require("../Plank")
var Scaffold = require("../Scaffold")
// var Square = require("../polygon/Square")
var CustomPolygon = require("../polygon/CustomPolygon")


class Prism extends Scaffold {
	constructor(pointValues, step, height, heightStep){

		let planks = getPrismPlanks(pointValues, step, height, heightStep)
		super(planks, heightStep)
	}
}


module.exports = Prism


function getPrismPlanks(pointValues, step, height, heightStep){

	var numOfPlanks = approx.round(height/heightStep)
	var currentHeight = 0
	var planks = []
	var orientation = "vertical"

	for(var i = 0; i < numOfPlanks; i++){

		let currentCustomPolygon = new CustomPolygon(pointValues, currentHeight)

		// console.log("current square is")
		// console.log(currentSquare.value)
	
		let currentPlank = new Plank(currentCustomPolygon, step, orientation)

		// console.log("from getCuboidPlanks")
		// console.log("current plank is")
		// console.log(currentPlank.value)

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
