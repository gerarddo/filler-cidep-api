// var functions = require("../../libraries/functions")
var approx = require("../../tools/approx")
// var math = require("../../tools/math")
var Point = require("../Point")
var Polygon = require("../Polygon")


class Square extends Polygon {
	constructor(side, z){
		var cos45 = Math.sqrt(2)/2
		var sin45 = Math.sqrt(2)/2
		let x = approx.round(side*cos45)
		let y = approx.round(side*sin45)
		// console.log("from square class")
		// console.log("x: " + x)
		// console.log("y: " + y)
		// console.log("angle: " + angle*180/Math.PI)
		let points = [
			new Point(-x,  0, z),
			new Point( 0, -y, z),
			new Point( x,  0, z),
			new Point( 0,  y, z)
		];
		super(points)
		this.diagonal = 2*x;
	}

	set diagonal(value){ this._diagonal = approx.round(value, 1000000) }
  	get diagonal(){ return this._diagonal }
}


module.exports = Square







