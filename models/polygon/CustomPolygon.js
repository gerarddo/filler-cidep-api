// var functions = require("../../libraries/functions")
var approx = require("../../tools/approx")
// var math = require("../../tools/math")
var Point = require("../Point")
var Polygon = require("../Polygon")


class CustomPolygon extends Polygon {
	constructor(values, z){

		let points = [];

		values.forEach((value) => {
			points.push(new Point(value[0], value[1], z))
		})





		super(points)
	}
}


module.exports = CustomPolygon




