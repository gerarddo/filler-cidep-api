var approx = require("../tools/approx");
var math = require("../tools/math");
var Point = require('./Point');
var Trajectory = require('./Trajectory');


class Polygon extends Trajectory {
	constructor(points) {
		checkPointsHeight(points)
	    super(points);
	    this.perimeter = getPerimeter(this.value); 
	    this.area = getArea(this.upperTrajectory, this.lowerTrajectory)
  	}

  	set perimeter(value){ this._perimeter = approx.round(value, 1000000) }
  	get perimeter(){ return getPerimeter(this.value) }

  	get upperTrajectory(){ return slicePolygon(this).upperTrajectory }

  	get lowerTrajectory(){ return slicePolygon(this).lowerTrajectory }

  	set area(value){ this._area = approx.round(value, 1000000) }
  	get area(){ return getArea(this.upperTrajectory, this.lowerTrajectory) }
}

module.exports = Polygon;

function getArea(upperTrajectory, lowerTrajectory){
	let area = 0;
	for(var i = 0; i < upperTrajectory.value.length - 1; i++){
		let currentPointIn = upperTrajectory.value[i];
		let currentPointFi = upperTrajectory.value[i+1];
		let deltaX = currentPointFi.value[0] - currentPointIn.value[0]
		area += (currentPointIn.value[1]+currentPointFi.value[1])*deltaX/2 // Area of trapezium
	}
	for(var i = 0; i < lowerTrajectory.value.length - 1; i++){
		let currentPointIn = lowerTrajectory.value[i];
		let currentPointFi = lowerTrajectory.value[i+1];
		let deltaX = currentPointFi.value[0] - currentPointIn.value[0]
		area += -(currentPointIn.value[1]+currentPointFi.value[1])*deltaX/2 // Area of trapezium
	}
	return area
}



function checkPointsHeight(points){
	let z = points[0].value[2]
	points.forEach((point) => {
		if(point.value[2] !== z){
			throw new TypeError("Height is not the same for all points in Polygon")
		}
	})
}
function getPerimeter(points){
	let perimeter = 0;
	// points.length - 2 is so that points[i+1] won't be undefined in the last iteration
	for(var i = 0; i < points.length - 1; i++){
		perimeter += points[i].distanceTo(points[i+1])
	}
	perimeter += points[0].distanceTo(points[i])
	return perimeter
}

function slicePolygon(polygon) {
	let smallestXPoint = polygon.extremes.x.smallest.point
	let largestXPoint = polygon.extremes.x.largest.point
	let points = polygon.value
	// Get the slope with respect to the indie component of the line connecting the two farthest points on the indie axis
	m = math.slope(largestXPoint.value, smallestXPoint.value)
	// Get the interception of the same connecting line with the dependent variable axis		
	b = math.interceptDependentAxis(largestXPoint.value, m)
	var upperPoints = points.filter(function(point){
		return point.value[1] >= approx.round(m*point.value[0] + b) 
	})
	var lowerPoints = points.filter(function(point){
		return point.value[1] <= approx.round(m*point.value[0] + b)
	})
	lowerPoints = _sortPoints(lowerPoints)
	upperPoints = _sortPoints(upperPoints)

	var upperTrajectory = new Trajectory(upperPoints, 0, "positive")
	var lowerTrajectory = new Trajectory(lowerPoints, 0, "positive")



	return {
		upperTrajectory: upperTrajectory, 
		lowerTrajectory: lowerTrajectory
	}
}

function _sortPoints(points) {
	function swap(array, i, j) {
	  	var temp = array[i];
	  	array[i] = array[j];
	  	array[j] = temp;
	}
	function compare(a, b){
		return a > b
	}
  	var swapped;
	do {
	    swapped = false;
	    for(var i = 0; i < points.length; i++) {
	      	if(points[i] && points[i + 1] && compare(points[i].value[0], points[i + 1].value[0])){
	        	swap(points, i, i + 1);
	        	swapped = true;
	      	}
	    }
	} while(swapped);
	return points;
}