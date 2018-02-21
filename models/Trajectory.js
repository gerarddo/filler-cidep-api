var approx = require('../tools/approx');
var Point = require('./Point')
var gcode = require("../tools/gcode")

class Trajectory{

	constructor(points){
		this.value = points
		this.length = getTrajectoryLength(points)
	}

	get value(){ return this._value }
	set value(points){ this._value = points }

	set length(value){ this._length = approx.round(value, 1000000) }
	get length(){ return this._length }

	get extremes(){ return getExtremePoints(this.value) }

	toArray(){
		let array = [];
		let i = 0;
		this.value.forEach((point) => {
			array[i] = point.value
			i++
		})
		return array
	}

  	toGcode(speed){ return gcode.trajectoryToGcode(this, speed); }
}

module.exports = Trajectory;


// Auxiliary Functions



function getTrajectoryLength(points){
	let length = 0;
	// points.length - 2 is so that points[i+1] won't be undefined in the last iteration
	for(var i = 0; i < points.length - 1; i++){
		length += points[i].distanceTo(points[i+1])
	}
	return length
}



function getPositionWithRespectTo(origin, points){
	var x = 0
	var f = 0
	points.forEach((point) => {
		x += point.value[0]
		f += point.value[1]
	})
	return (new Point(x, f)).minus(origin)
} 


function getExtremePoints(points){

	var index = 0;

	var smallestX = points[0].value[0];
	var	smallestXPoint = points[0]
	var	smallestXIndex = index;

	var smallestY = points[0].value[1];
	var	smallestYPoint = points[0]
	var	smallestYIndex = index;

	var largestX = points[0].value[0];
	var	largestXPoint = points[0]
	var	largestXIndex = index;

	var largestY = points[0].value[1];
	var	largestYPoint = points[0]
	var	largestYIndex = index;

	points.forEach((point) => {

		if(smallestX > point.value[0]){
			smallestX = point.value[0];
			smallestXPoint = point
			smallestXIndex = index;
		}
		if(smallestY > point.value[1]){
			smallestY = point.value[1];
			smallestYPoint = point
			smallestYIndex = index;
		}

		if(largestX < point.value[0]){
			largestX = point.value[0];
			largestXPoint = point
			largestXIndex = index;
		}
		if(largestY < point.value[1]){
			largestY = point.value[1];
			largestYPoint = point
			largestYIndex = index;
		}

		index++
	})

	return {
		x: {
			smallest: {
				value: smallestX,
				point: smallestXPoint,
				index: smallestXIndex
			},
			largest: {
				value: largestX,
				point: largestXPoint,
				index: largestXIndex
			},
		},
		y: {
			smallest: {
				value: smallestY,
				point: smallestYPoint,
				index: smallestYIndex
			},
			largest: {
				value: largestY,
				point: largestYPoint,
				index: largestYIndex
			},
		}
	}
}


function stablishDim(dim){

	try{
		if (!(dim === "x" | dim === "y" | dim === 0 | dim === 1)){
			throw new TypeError('dim is not a valid dimension', "models/Trajectory.js", 5);
			return null
		}
	} catch(err) {
		console.log(err)
	}

	switch (dim) {
    case "x":
        return 0
        break;
    case "f":
        return 1
        break;
    default:
    	return dim
	}
}