var approx = require('./approx.js')
var Point = require('../models/Point')


var router = {

	trajectoryToGcode: function(trajectory, speed){
		const values = trajectory.toArray()
		var gcode = ""
		for(var i = 0; i < values.length; i++){
			gcode += `G1 X${values[i][0]} Y${values[i][1]} `			
			if(values[i][2]!==undefined){
				gcode += `Z${values[i][2]} `
			}
			gcode += " \n"
		}
		return gcode
	},

	scaffoldToCIDEPGcode: function(scaffold, speed){
		const planks = scaffold.associatedPlanks,
			  transitions = scaffold.transitions,
			  flags = scaffold.flags, 
			  outerPoint = scaffold.value[0],
			  pointIn = scaffold.value[1],
			  heightStep = scaffold.heightStep,
			  iMat = 0.026;
		var   extrusion = 0;

		// extrusion += outerPoint.distanceTo(pointIn)*iMat;

		// Rembember to fix the fact that the last point ins't getting printed
		let addPlankPointsToCIDEPGcode = function(points, initialPoint){
			let partialGcode = "";
			let values = [];
			var j = 0;
			points.forEach((point) => { 
				// We clone so that the original Point instance doesn't get modified
				let clone = new Point(...point.value)
				values[j] = clone.value;
				// Set all z components to 0
				values[j][2] = 0;
				j++
			})


			// let firstValue = values[0]
			let currentPoint = points[0], 
				currentValue = values[0],
				x = currentValue[0], y = currentValue[1], z = currentValue[2];
			let lastPoint = initialPoint;
			console.log("initialPoint is")
			console.log(initialPoint)
			console.log(extrusion)
			extrusion += currentPoint.distanceTo(lastPoint)*iMat;
			console.log( currentPoint.distanceTo(lastPoint))

			partialGcode += `G1 X${x} Y${y} Z${z} E${approx.round(extrusion)} F4 \n` 	//ASDFASDFASDF


			for(var i = 1; i < values.length; i++){
				currentPoint = points[i], currentValue = values[i],
				x = currentValue[0], y = currentValue[1], z = currentValue[2];
				lastPoint = points[i-1];
				extrusion += currentPoint.distanceTo(lastPoint)*iMat;
				partialGcode += `G1 X${x} Y${y} Z${z} E${approx.round(extrusion)} F4 \n` //ASDFASDF
			}

			// if(lastPoint !== undefined){
			// 	let currentPoint = points[i],
			// 		currentValue = values[i],
			// 		x = currentValue[0], 
			// 		y = currentValue[1], 
			// 		z = currentValue[2];
			// 	let nextPoint = lastPoint;
			// 	extrusion += currentPoint.distanceTo(nextPoint)*iMat;
			// 	partialGcode += `G1 X${x} Y${y} Z${z} E${approx.round(extrusion)} \n`
			// }
			return partialGcode
		}

		let addTransitionPointsToCIDEPGcode = function(points, firstPoint, transitionHeightStep){
			let partialGcode = "";
			let values = [];
			var j = 0;
			points.forEach((point) => { 
				// We clone so that the original Point instance doesn't get modified
				let clone = new Point(...point.value)
				values[j] = clone.value;
				values[j][2] = 0;
				j++
			})
			if(transitionHeightStep !== undefined && transitionHeightStep !== 0){
				values[0][2] = transitionHeightStep
				values.forEach((value) => {
					let x = value[0], y = value[1], z = value[2];
					partialGcode += `G1 X${x} Y${y} Z${z} F4 \n`; //ASDFASDFASDF
				})
			} 
			return partialGcode
		}
		// First add the outerpoint gcode
		var gcode = `G1 X${outerPoint.value[0]} Y${outerPoint.value[1]} Z${outerPoint.value[2]} F4 \n`; //ASDFASDFASDFAS
		// var gcode += `G1 X${outerPoint.value[0]} Y${outerPoint.value[1]} Z${outerPoint.value[2]} \n`;

		var	currentPlank = [],
			firstPointOfNextPlank = {};


		let firstPlank = planks[0];

		var transitionPoints = [outerPoint]
		// console.log("from scaffoldToCIDEPGcode")
		// console.log(transitionPoints)

		// Start adding planks and transitions but the last plank
		for(var i = 0; i < planks.length-1; i++){
			currentPlank = planks[i]
			lastPointOfPastTransition = transitionPoints[transitionPoints.length-1]
			// console.log("from for loop")
			// console.log(lastPointOfPastTransition)
			gcode += `\n; PLANK INDEX ${i} ${currentPlank.orientation} \n`;
			let currentPlankPoints = currentPlank.value
			gcode += addPlankPointsToCIDEPGcode(currentPlankPoints, lastPointOfPastTransition) + `; -- transition starts -- \n`;
			transitionPoints = transitions[i]
			gcode += addTransitionPointsToCIDEPGcode(transitionPoints, firstPointOfNextPlank, heightStep)
		}
		// Add the last plank
		currentPlank = planks[i]
		lastPointOfPastTransition = transitionPoints[transitionPoints.length-1]
		gcode += `\n; PLANK INDEX ${i} ${currentPlank.orientation} \n`;
		let currentPlankPoints = currentPlank.value
		gcode += addPlankPointsToCIDEPGcode(currentPlankPoints, lastPointOfPastTransition);

		// currentPlank = planks[i]
		// lastPointOfPastTransition = transitionPoints[transitionPoints.length-1]
		// gcode += `\n; PLANK INDEX ${i} ${currentPlank.orientation} \n`;
		// let currentPlankPoints = currentPlank.value
		// gcode += addPlankPointsToCIDEPGcode(currentPlankPoints, lastPointOfPastTransition) + `; -- transition starts -- \n`;
		// transitionPoints = transitions[i]
		// gcode += addTransitionPointsToCIDEPGcode(transitionPoints, firstPointOfNextPlank, heightStep)

		return gcode
	}

}

module.exports = router;

