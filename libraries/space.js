// Mainly for spatial matrix transformations
var check = require('../tools/check.js');
var math = require('../tools/math.js');
var Point = require('../models/Point.js');
var Polygon = require('../models/Polygon.js');
var Trajectory = require('../models/Trajectory.js');




var router = {

	getComponents: function(dim, array){

		dim = stablishDim(dim)

		if(check.isPoint(array)){
			return array.value[dim]
		} 



		// else if (array instanceof Trajectory) {
		// 	var components = [];
		// 	for(var i = 0; i < array.length; i++){
		// 		components[i] = array[i][dim]
		// 	}
		// }
	},

	rotate2DSpaceByMinus90: function(points){

		var rotatedPoints = [];
		const z = points[0].value[2]
		var rotatedDependentVariable = Number;
		var rotatedIndependentVariable = Number;

		for(var i = 0; i < points.length; i++){		

			rotatedDependentVariable =  points[i].value[1]
			rotatedIndependentVariable = (-1)*points[i].value[0]
			rotatedPoints[i] = new Point(rotatedDependentVariable, rotatedIndependentVariable, z)
		}

		return rotatedPoints
	},


	rotate2DSpaceBy90: function(points){
		var rotatedPoints = [];
		var rotatedDepVariable = 0;
		var rotatedIndieVariable = 0;

		for(var i = 0; i < points.length; i++){		

			rotatedDependentVariable =  (-1)*points[i].value[1]
			rotatedIndependentVariable = points[i].value[0]
			rotatedPoints[i] = new Point(rotatedDependentVariable, rotatedIndependentVariable)
		}
		return rotatedPoints
	},

	rotatePolygonBy90: function(polygon){
		var points = polygon.value
		const z = points[0].value[2]
		var rotatedPoints = [];
		var rotatedDepVariable = 0;
		var rotatedIndieVariable = 0;

		for(var i = 0; i < points.length; i++){		

			rotatedDependentVariable =  (-1)*points[i].value[1]
			rotatedIndependentVariable = points[i].value[0]
			rotatedPoints[i] = new Point(rotatedDependentVariable, rotatedIndependentVariable, z)
		}

		polygon.value = rotatedPoints

		return polygon
	},

	rotatePolygon: function(polygon, angle){

		var points = polygon.value
		var rotatedPoints = [];
		var rotatedDepVariable = 0;
		var rotatedIndieVariable = 0;

		for(var i = 0; i < points.length; i++){		
			// rotatedDependentVariable =  (-1)*points[i].value[1]
			// rotatedIndependentVariable = points[i].value[0]
			// rotatedPoints[i] = new Point(rotatedDependentVariable, rotatedIndependentVariable)

			rotatedDependentVariable = points[i].value[0]*Math.cos(math.toRadians(angle)) - points[i].value[1]*Math.sin(math.toRadians(angle))
			rotatedIndependentVariable = points[i].value[0]*Math.sin(math.toRadians(angle)) + points[i].value[1]*Math.cos(math.toRadians(angle))
			rotatedPoints[i] = new Point(rotatedDependentVariable, rotatedIndependentVariable)
		}

		return new Polygon(rotatedPoints)
	}

}

module.exports = router









// var math = require('./math.js');

function getComponents(dim, array){
	var components = [];
	if(dim === 0){
		for(var i = 0; i < array.length; i++){
			components[i] = array[i][0]
		}
	} else if (dim === 1){
		for(var i = 0; i < array.length; i++){
			components[i] = array[i][1]
		}
	}
	return components
}


function extremeValuePos(extreme, array){
	var extValue = array[0];
	var position = 0;
	switch(extreme){
		case "max":
				for(var i = 0; i < array.length; i++){
					if(array[i] > extValue){
						extValue = array[i]
						position = i
					}
				}
				break;
		case "min":
				for(var i = 0; i < array.length; i++){
					if(array[i] < extValue){
						extValue = array[i]
						position = i
					}
				}
				break;
	} // end switch
	return [position, extValue]
}

function sortArrayByDim(dim, array){
	array = array.sort(sortFunction);
	function sortFunction(a, b) {
	    if (a[0] === b[0]) {
	        return 0;
	    }
	    else {
	        return (a[0] < b[0]) ? -1 : 1;
	    }
	}
	return array
}


// rotate2DSpace todavia puede causar algunos problemas a la hora de rotar debido a la errores de precision de la compu

function rotate2DSpace(points, angle){

	var newPoints = [];
	var newDependentVariable = Number;
	var newIndependentVariable = Number;

	for(var i = 0; i < points.length; i++){		

		newDependentVariable = points[i][0]*Math.cos(math.toRadians(angle)) - points[i][1]*Math.sin(math.toRadians(angle))
		newIndependentVariable = points[i][0]*Math.sin(math.toRadians(angle)) + points[i][1]*Math.cos(math.toRadians(angle))
		newPoints[i] = [newDependentVariable, newIndependentVariable]
	}

	return newPoints
}

function rotate2DSpaceBy90(points){

	var newPoints = [];
	var newDependentVariable = Number;
	var newIndependentVariable = Number;

	for(var i = 0; i < points.length; i++){		

		newDependentVariable =  (-1)*points[i][1]
		newIndependentVariable = points[i][0]
		newPoints[i] = [newDependentVariable, newIndependentVariable]
	}

	return newPoints
}

function rotate2DSpaceByMinus90(points){

	var newPoints = [];
	var newDependentVariable = Number;
	var newIndependentVariable = Number;

	for(var i = 0; i < points.length; i++){		

		newDependentVariable =  points[i][1]
		newIndependentVariable = (-1)*points[i][0]
		newPoints[i] = [newDependentVariable, newIndependentVariable]
	}

	return newPoints
}

function distance(point1, point2, dim){

	if(dim === undefined){
		return ((point1[0] - point2[0])^2 + (point1[1] - point2[1])^2)^(1/2)
	} else if (dim === 0){
		return Math.abs(point1[0] - point2[0])
	} else if (dim === 1){
		return Math.abs(point1[1] - point2[1])
	}


}


// module.exports = {
//   getComponents: getComponents,
//   sortArrayByDim: sortArrayByDim,
//   extremeValuePos: extremeValuePos,
//   rotate2DSpaceBy90: rotate2DSpaceBy90,
//   rotate2DSpaceByMinus90: rotate2DSpaceByMinus90,
//   rotate2DSpace: rotate2DSpace,
//   distance: distance
// };






























function stablishDim(dim){

	try{
		if(typeof dim !== 'string') {
			throw new TypeError('dim is not a string', "libraries/space.js", 5);
		} else if ( !(dim === "x" | dim === "y" | dim === "z") ){
			throw new TypeError('dim is not a valid dimension', "libraries/space.js", 5);
		}
	} catch(err) {
		console.log(err)
	}

	switch (dim) {
    case "x":
        return 0
        break;
    case "y":
        return 1
        break;
    case "z":
    	return 2
    	break;
    default:
    	return null
	}
}