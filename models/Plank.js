var processor = require("../libraries/processor");
var approx = require("../tools/approx");
var gcode = require("../tools/gcode");
var Trajectory = require('./Trajectory')
var Point = require('./Point')


class Plank extends Trajectory {
	constructor(polygon, step, orientation) {
		let alternatedPoints = processor.processAndFillPolygon(polygon, step, orientation)
	    super(alternatedPoints);
	    this.associatedPolygon = polygon
	    this.height = this.value[0].value[2]
	    this.orientation = orientation
  	}

  	set height(value){ 
  		value = approx.round(value, 1000000)
  		changeHeightOfPolygon(this.associatedPolygon, value)
  		changeHeightOfPoints(this.value, value)
  		this._height = value
  	}
  	get height(){ this._height = this.value[0].value[2] }

  	set associatedPolygon(value){ this._associatedPolygon = value }
  	get associatedPolygon(){ return this._associatedPolygon }
}

module.exports = Plank;

function changeHeightOfPolygon(polygon, z){
	let value = polygon.value
	value.forEach((point) => { point.value[2] = z })
	polygon.value = value
	return polygon
}

function changeHeightOfPoints(points, z){
	points.forEach((point) => { point.value[2] = z })
	return points
}
















