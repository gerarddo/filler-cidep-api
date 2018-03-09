var approx = require('./approx.js')


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

		extrusion += outerPoint.distanceTo(pointIn)*iMat;

		let addPointsToCIDEPGcode = function(points, transitionHeightStep){
			let partialGcode = "";
			points.forEach((point) => { point.value[2] = 0; })
			if(transitionHeightStep !== undefined && transitionHeightStep !== 0){
				points[0].value[2] = transitionHeightStep
				points.forEach((point) => {
					let x = point.value[0], y = point.value[1], z = point.value[2];
					partialGcode += `G1 X${x} Y${y} Z${z} \n`
				})
			} else {
				for(var i = 0; i < points.length-1; i++){
					let currentPoint = points[i],
						x = currentPoint.value[0], 
						y = currentPoint.value[1], 
						z = currentPoint.value[2];
					let nextPoint = points[i+1];
					extrusion += currentPoint.distanceTo(nextPoint)*iMat;
					partialGcode += `G1 X${x} Y${y} Z${z} E${approx.round(extrusion)} \n`
				}
			}
			return partialGcode
		}
		// First add the outerpoint gcode
		var gcode = `G1 X${outerPoint.value[0]} Y${outerPoint.value[1]} Z${outerPoint.value[2]} \n`
		// Start adding planks and transitions but the last plank
		for(var i = 0; i < planks.length-1; i++){
			currentPlank = planks[i]
			gcode += `\n; PLANK INDEX ${i} ${currentPlank.orientation} \n`;
			let currentPlankPoints = currentPlank.value
			gcode += addPointsToCIDEPGcode(currentPlankPoints) + `; -- transition starts -- \n`;
			let transitionPoints = transitions[i]
			gcode += addPointsToCIDEPGcode(transitionPoints, heightStep)
		}
		// Add the last plank
		currentPlank = planks[i]
		gcode += `\n; PLANK INDEX ${i} ${currentPlank.orientation} \n`;
		let currentPlankPoints = currentPlank.value
		gcode += addPointsToCIDEPGcode(currentPlankPoints);

		return gcode
	}

}

module.exports = router;





// scaffoldToCIDEPGcode: function(scaffold, speed){

// // var scaffoldValue = scaffold.value
// 		// scaffoldValue[0] = scaffoldValue[0].scale(2.12132)

// 		const scaffoldValue = scaffold.value
// 		const pointIn = scaffoldValue[0]
// 		const pointInOfScaffold = scaffoldValue[1]
// 		const flags = scaffold._flag
// 		const heightStep = scaffold._heightStep

// 		console.log("this are the scaffold's flags")
// 		console.log(flags)
		
// 		var gcode = "";
// 		var extrusion = 0;
// 		var flagIndex = 0;
// 		var lastZ = pointIn.value[2]
// 		const iMat = 0.026
// 		var noGcode = true;

// 		// Add the first point of the gcode
// 		gcode += `G1 X${pointIn.value[0]} Y${pointIn.value[1]} `			
// 		if(pointIn.value[2]!==undefined){
// 			gcode += `Z${pointIn.value[2]} `
// 		}
// 		gcode += "\n"

// 		// Start extruding from the outerpoint
// 		extrusion += pointIn.distanceTo(pointInOfScaffold)*iMat
		
// 		for(var i = 1; i < scaffoldValue.length; i++){

// 			let currentPoint = scaffoldValue[i]
// 			let	nextPoint = scaffoldValue[i+1]				
// 			let currentPointValue = currentPoint.value
// 			// gcode += String(i) + " " //tweak, erase later
// 			gcode += `G1 X${currentPointValue[0]} Y${currentPointValue[1]} `			
// 			if(currentPointValue[2]===lastZ){
// 				gcode += `Z0 `
// 			} else {
// 				gcode += `Z${heightStep} `
// 				lastZ = currentPointValue[2]
// 			}
// 			// if(flags[flagIndex] !== undefined) is a hack, fix later
// 			if(flags[flagIndex] !== undefined){
// 				if(i >= flags[flagIndex].startExtrusionIndex && i <= flags[flagIndex].stopExtrusionIndex){
// 					if(currentPointValue[2] === lastZ){
// 						extrusion += currentPoint.distanceTo(nextPoint)*iMat
// 					}
// 					if(i === flags[flagIndex].stopExtrusionIndex){
// 						flagIndex++
// 					}
// 				} 
// 				if(noGcode){
// 					gcode += `E${extrusion} `
// 					noGcode = false
// 				}
// 				if(currentPointValue[2] === nextPoint.value[2]){
// 					noGcode = true
// 				}
// 			}
// 			if(speed!==undefined){
// 				gcode+= String(speed) + " "
// 			}
// 			gcode += "\n"
// 		}
// 		return gcode
// 	}