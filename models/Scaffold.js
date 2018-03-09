var Trajectory = require("./Trajectory")
var Point = require("./Point")
var approx = require("../tools/approx")
var gcode = require("../tools/gcode")

class Scaffold extends Trajectory {
	

	constructor(planks, heightStep) {
		let points = []
		let flags = []
		let transitions = getArrayOfTransitionPoints(planks)
		// Add the outerPoint
		let pointIn = planks[0].value[0]
		points.push(pointIn.scale(2))
		// Start adding planks with their transitions, except the last plank
		for(var i = 0; i < planks.length - 1; i++){
			points = points.concat(planks[i].value)
			let startTransition = points.length
			points = points.concat(transitions[i])
			let endTransition = points.length
			// Put flags for every transition start and finish
			flags.push({
				startTransition: startTransition,
				endTransition: endTransition
			})
		}
		// Add the last plank
		points = points.concat(planks[planks.length-1].value)

		super(points, "none")
		this.flags = flags
		this.heightStep = heightStep
		this.associatedPlanks = planks
		this.transitions = transitions
		this.volume = getVolumeOfScaffold(this)
		this.area = getAreaOfScaffold(this)
  	}

  	set flags(value){ this._flags = value; }
  	get flags(){ return this._flags }

  	set heightStep(value){ this._heightStep = value }
  	get heightStep(){ return this._heightStep }

  	set volume(value){ this._volume = value }
  	get volume(){ return this._volume }

  	set area(value){ this._area = value }
  	get area(){ return this._area }

  	set associatedPlanks(value){ this._associatedPlanks = value }
  	get associatedPlanks(){ return this._associatedPlanks }

  	set transitions(value){ this._transitions = value }
  	get transitions(){ return this._transitions }

  	// toCIDEPGcode(pointIn, speed){
  	// 	return gcode.scaffoldToCIDEPGcode(this, pointIn, speed);
  	// }

  	toCIDEPGcode(speed){
  		return gcode.scaffoldToCIDEPGcode(this, speed);
  	}
}

module.exports = Scaffold;

function getArrayOfTransitionPoints(planks){
	let transitions = [];
	for(var i = 0; i < planks.length-1; i++){
		// Get of last point before transition begins
		let currentPlank = planks[i],
			lastPointOfCurrentPlank = currentPlank.value[currentPlank.value.length - 1];
		// Get first point of transition
		let nextPlank = planks[i+1],
			firstPointOfNextPlank = nextPlank.value[0];
		// Retrieve rest of transition points for this pair of planks
		var transitionPoints = [];
		if(nextPlank.orientation === "horizontal"){
			let horizontalTrajValue = reversePoints(nextPlank.associatedPolygon.upperTrajectory.value);
			transitionPoints = getPointsInAngleInterval(horizontalTrajValue, firstPointOfNextPlank,lastPointOfCurrentPlank);
		} else if(nextPlank.orientation === "vertical"){
			let verticalTrajValue = nextPlank.associatedPolygon.lowerTrajectory.value;
			let transitionPointsReverted = getPointsInAngleInterval(verticalTrajValue, firstPointOfNextPlank,lastPointOfCurrentPlank);
			transitionPoints = reversePoints(transitionPointsReverted);
		}
		// Last point of the transition is the first of next plank, so let's pop it
		transitionPoints.pop();
		// Round up points values
		transitionPoints.forEach((point) => { point.value = approx.round(point.value); })

		transitions[i] = transitionPoints;
	} 
	return transitions
}

function reversePoints(points){
	let j = 0
	let reversedPoints = []
	for(var i = points.length -1; i > -1; i--){
		reversedPoints[j] = points[i]
		j++
	}
	return reversedPoints
}


function getPointsInAngleInterval(points, pointFi, pointIn){
	var angle = pointIn.XYangleTo(pointFi);
	var currentAngle = 0;
	var transitionPoints = []
	var i = 0 
	while(true){
		// stop loop in case we're done with points
		if(points[i]===undefined){break;} 
		currentAngle = pointIn.XYangleTo(points[i])
		// if ((currentAngle and angle have same direction) && (angle bigger than currentAngle)) then ...
		if(currentAngle*angle >= 0 && Math.abs(angle) >= Math.abs(currentAngle)){
			transitionPoints.push(points[i])
		} else if (currentAngle*angle > 0 && Math.abs(angle) < Math.abs(currentAngle)){
			break;
		}
		i++
	}
	return transitionPoints
}


function getVolumeOfScaffold(scaffold){
	let planks = scaffold.associatedPlanks
	let volume = 0;
	for(var i = 0; i < planks.length; i++){
		let currentPolygon = planks[0].associatedPolygon
		volume += currentPolygon.area*scaffold.heightStep;
	}
	return volume
}

function getAreaOfScaffold(scaffold){
	let planks = scaffold.associatedPlanks
	let area = 0;
	for(var i = 0; i < planks.length; i++){
		let currentPolygon = planks[0].associatedPolygon
		area += currentPolygon.perimeter*scaffold.heightStep;
	}
	area += planks[0].associatedPolygon.area
	area += planks[planks.length-1].associatedPolygon.area
	return area
}
















