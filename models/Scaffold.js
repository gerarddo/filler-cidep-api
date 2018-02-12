var Trajectory = require("./Trajectory")
var Point = require("./Point")
var gcode = require("../tools/gcode")

class Scaffold extends Trajectory {
	

	constructor(planks, heightStep) {

		let lastPoints = []
		let points = []
		let flags = []
		var startExtrusionIndex = 0
		var stopExtrusionIndex = 0
		for(var i = 0; i < planks.length; i++){
			let currentPlank = planks[i]
			// Declare that from this array's index on, you will be extruding material
			if(i === 0){
				startExtrusionIndex = 0
			} else {
				startExtrusionIndex = points.length + 1
			}
			// Add the path of the plank where you will be extruding material
			points = points.concat(currentPlank.value)

			var lastPointOfCurrentPlank = currentPlank.value[currentPlank.value.length - 1]
			let x = lastPointOfCurrentPlank.value[0]
			let y = lastPointOfCurrentPlank.value[1]
			let z = lastPointOfCurrentPlank.value[2]

			// Declare that from this array's index on, you won't be extruding material
			stopExtrusionIndex = points.length - 1 
			// Add the point that will work as a transition between planks, were you won't be extruding material
			points.push(new Point(x, y, z + heightStep))
			// Finally, push the flag with the indexes
			flags.push({
				startExtrusionIndex: startExtrusionIndex,
				stopExtrusionIndex: stopExtrusionIndex
			})

			// Start retrieving the transition points
			if(planks[i+1]!==undefined){
				var nextPlank = planks[i+1]
				var firstPointOfNextPlank = nextPlank.value[0]
				var transitionPoints = []
				if(nextPlank.orientation === "horizontal"){
					let horizontalTrajValue = reversePoints(nextPlank.associatedPolygon.upperTrajectory.value)
					transitionPoints = getPointsInAngleInterval(horizontalTrajValue, firstPointOfNextPlank,lastPointOfCurrentPlank)
					transitionPoints = reversePoints(transitionPoints)
				} else {
					let verticalTrajValue = nextPlank.associatedPolygon.lowerTrajectory.value
					let transitionPointsReverted = getPointsInAngleInterval(verticalTrajValue, firstPointOfNextPlank,lastPointOfCurrentPlank)
					transitionPoints = reversePoints(transitionPointsReverted)
				}
				// Add the transition points where you won't be extruding anything
				points = points.concat(transitionPoints)
			} 
		} 

		super(points, "none")
		this.flag = flags
		this.heightStep = heightStep
  	}

  	set flag(value){
  		this._flag = value;
  	}
  	get flag(){
  		return this._flag
  	}

  	set heightStep(value){
  		this._heightStep = value
  	}
  	get heightStep(){
  		return this._heightStep
  	}

  	toCIDEPGcode(pointIn, speed){
  		return gcode.scaffoldToCIDEPGcode(this, pointIn, speed);
  	}

}

module.exports = Scaffold;


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
		if(points[i]===undefined){
			break;
		}
		currentAngle = pointIn.XYangleTo(points[i])
		if(currentAngle*angle > 0 && Math.abs(angle) > Math.abs(currentAngle)){
			transitionPoints.push(points[i])
		} else if (currentAngle*angle > 0 && Math.abs(angle) < Math.abs(currentAngle)){
			break;
		}
		i++
	}
	return transitionPoints
}




















