// var functions = require("../../libraries/functions")
var approx = require("../../tools/approx")
// var math = require("../../tools/math")
var Point = require("../Point")
var Polygon = require("../Polygon")


class Square extends Polygon {
	constructor(side, z){
		var angle = Math.PI/2
		let x = approx.round(side*Math.cos(angle))
		let y = approx.round(side*Math.sin(angle))
		let points = [
			new Point(-x,  0, z),
			new Point( 0, -y, z),
			new Point( x,  0, z),
			new Point( 0,  y, z)
		];
		super(points)
	}
}


module.exports = Square







