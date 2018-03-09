var math = require("../tools/math");
var approx = require("../tools/approx");
var space = require("../libraries/space");
var Trajectory = require("../models/Trajectory");
var Point = require("../models/Point");
var Polygon = require("../models/Polygon");
// var Scaffold = require("../models/Scaffold");


var router = {
	processAndFillPolygon: processAndFillPolygon,
	_preselectPoints: _preselectPoints
}

module.exports = router;

function processAndFillPolygon(polygon, step, orientation){
	// Rotate by 90 degrees in case we want to fill horizontally
	if(orientation === "horizontal"){ polygon = space.rotatePolygonBy90(polygon) }
	// Retrieve polygons divisions
	var upperPointsAux = polygon.upperTrajectory.value,
		lowerPointsAux = polygon.lowerTrajectory.value;
	// Get last points to add at the end since _preselectPoints may take'em away
	let lastUpperPoint = upperPointsAux[upperPointsAux.length-1],
		lastLowerPoint = lowerPointsAux[lowerPointsAux.length-1];
	// Make the preselection of points
	upperPointsAux = _preselectPoints(upperPointsAux, step);
	lowerPointsAux = _preselectPoints(lowerPointsAux, step);
	// Declare variables needed in for loop
	var upperPoints = [],
	 	lowerPoints = [],
		displacement = 0;
	// Start the retrajectorization and filling
	for(var i = 0; i < upperPointsAux.length-1; i++){
		// Select current points of interest
		var pointFi = upperPointsAux[i+1],
			pointIn = upperPointsAux[i];
		// Reset displacement
		displacement = 0;
		if(i > 0){
			var diff = _latestDifference(upperPoints, pointIn, 0, step)
			displacement = approx.round(Math.abs(diff - step))
		}
		var side = _trajectorizePoints(pointFi, pointIn, step, displacement).value
		upperPoints = upperPoints.concat(side)
	}
	for(var i = 0; i < lowerPointsAux.length-1; i++){
		// Select current points of interest
		var pointFi = lowerPointsAux[i+1],
			pointIn = lowerPointsAux[i];
		// Reset displacement
		displacement = 0;
		if( i > 0){
			var diff = _latestDifference(lowerPoints, pointIn, 0, step)
			displacement = approx.round(Math.abs(diff - step))
		}
		var side = _trajectorizePoints(pointFi, pointIn, step, displacement).value
		lowerPoints = lowerPoints.concat(side)
	}
	let theyreEqual = Boolean;
	theyreEqual = approx.equal(upperPoints[upperPoints.length-1].value, lastUpperPoint.value)
	if(!theyreEqual){ upperPoints.push(lastUpperPoint); }
	theyreEqual = approx.equal(lowerPoints[lowerPoints.length-1].value, lastLowerPoint.value)
	if(!theyreEqual){ lowerPoints.push(lastLowerPoint); }	
	// Rotate back in case we want horizontal
	if(orientation === "horizontal"){
		upperPoints = space.rotate2DSpaceByMinus90(upperPoints)
		lowerPoints = space.rotate2DSpaceByMinus90(lowerPoints)
	}
	var alternatedPoints = [];
	alternatedPoints = _alternatePointsForPlank(upperPoints, lowerPoints)
	return alternatedPoints;
}

// AlternatePointsForScaffold assume its parameters have the same length
function _alternatePointsForPlank(upperPoints, lowerPoints){
	if(upperPoints.length !== lowerPoints.length){
		throw new TypeError("upper and lower points have different lengths")
	} 
	upperPoints.pop()   // remove the last element
	lowerPoints.shift() // remove the first element

	let length = upperPoints.length
	let alternatedPoints = []
	for(var i=0; i < length; i+=2){
		alternatedPoints.push(upperPoints[i])
		if(upperPoints[i+1]!==undefined){
			alternatedPoints.push(upperPoints[i+1])
		}
		alternatedPoints.push(lowerPoints[i])
		if(lowerPoints[i+1]!==undefined){
			alternatedPoints.push(lowerPoints[i+1])
		}
	}
	return alternatedPoints
}

function _latestDifference(points, lastPoint, dim, step){
	var lastPointPos = points.length
	return  Math.abs(lastPoint.value[dim] - points[lastPointPos-1].value[dim])
}

function _trajectorizePoints(pointFi, pointIn, step, firstDisplacement){
	let z = pointFi.value[2]
	let pf = [pointFi.value[0], pointFi.value[1]]
	let pi = [pointIn.value[0], pointIn.value[1]]

	var m = math.slope(pf, pi);
	var points = [];

	// firstDisplacement is understood to be the desired displacement on the indie variable axis
	if(firstDisplacement != undefined & firstDisplacement != 0){
		pi = approx.round([pi[0]+firstDisplacement, pi[1]+m*firstDisplacement])
	}
	var numOfPoints = approx.round(Math.abs(pf[0] - pi[0])/step)
	if( approx.round(numOfPoints/step) % 1 != 0 ){
		numOfPoints = Math.floor(numOfPoints)
		numOfPoints++
	}
	var independent = pi[0]
	var dependent = pi[1]

	for (var i = 0; i < numOfPoints; i++){
		points[i] = new Point(...approx.round([independent, dependent, z]))
		independent += step
		dependent += m*step
	}
	trajectory = new Trajectory(points)
	return trajectory
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

function _preselectPoints(points, step){
	// Check if user didn't forgot step parameter
	if(step===undefined){ throw new TypeError("step is not defined") }
	let i = 0
	while(points[i+1]!=undefined){
		// Retrieve x distance between current point and next point in array
		let indieDistanceBetweenPoints = Math.abs(points[i].value[0] - points[i+1].value[0])
		// if (x distance to next point is smaller that step) then { remove next point from array }
		if( approx.round(indieDistanceBetweenPoints) < approx.round(step)){
			points.splice(i+1, 1)
			i--
		}
		i++
	}
	return points
}
