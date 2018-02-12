// var functions = require("../../libraries/functions")
var approx = require("../../tools/approx")
var math = require("../../tools/math")
var Point = require("../Point")
var Polygon = require("../Polygon")


class Circle extends Polygon {
	constructor(r, angleStep, z){
		var angle = 0
		let numOfPoints = approx.round(360/angleStep)
		var points = [];
		angleStep = math.toRadians(angleStep)	
		for(var i = 0; i < numOfPoints; i++){
			let x = r*approx.round(Math.cos(angle))
			let y = r*approx.round(Math.sin(angle))
			angle += angleStep
			points[i] = new Point(x, y, z)
		}
		super(points)
	}
}


module.exports = Circle






