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

// var scaffoldValue = scaffold.value
		// scaffoldValue[0] = scaffoldValue[0].scale(2.12132)




		const scaffoldValue = scaffold.value
		const pointIn = scaffoldValue[0]
		const pointInOfScaffold = scaffoldValue[1]
		const flags = scaffold._flag
		const heightStep = scaffold._heightStep

		console.log("this are the scaffold's flags")
		console.log(flags)
		
		var gcode = "";
		var extrusion = 0;
		var flagIndex = 0;
		var lastZ = pointIn.value[2]
		const iMat = 0.026
		var noGcode = true;

		// Add the first point of the gcode
		gcode += `G1 X${pointIn.value[0]} Y${pointIn.value[1]} `			
		if(pointIn.value[2]!==undefined){
			gcode += `Z${pointIn.value[2]} `
		}
		gcode += "\n"

		// Start extruding from the outerpoint
		extrusion += pointIn.distanceTo(pointInOfScaffold)*iMat
		
		for(var i = 1; i < scaffoldValue.length; i++){

			let currentPoint = scaffoldValue[i]
			let	nextPoint = scaffoldValue[i+1]				
			let currentPointValue = currentPoint.value
			// gcode += String(i) + " " //tweak, erase later
			gcode += `G1 X${currentPointValue[0]} Y${currentPointValue[1]} `			
			if(currentPointValue[2]===lastZ){
				gcode += `Z0 `
			} else {
				gcode += `Z${heightStep} `
				lastZ = currentPointValue[2]
			}
			// if(flags[flagIndex] !== undefined) is a hack, fix later
			if(flags[flagIndex] !== undefined){
				if(i >= flags[flagIndex].startExtrusionIndex && i <= flags[flagIndex].stopExtrusionIndex){
					if(currentPointValue[2] === lastZ){
						extrusion += currentPoint.distanceTo(nextPoint)*iMat
					}
					if(i === flags[flagIndex].stopExtrusionIndex){
						flagIndex++
					}
				} 
				if(noGcode){
					gcode += `E${extrusion} `
					noGcode = false
				}
				if(currentPointValue[2] === nextPoint.value[2]){
					noGcode = true
				}
			}
			if(speed!==undefined){
				gcode+= String(speed) + " "
			}
			gcode += "\n"
		}
		return gcode
	}

}

module.exports = router;