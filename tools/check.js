

var Point = require('../models/Point.js');
var Trajectory = require('../models/Trajectory.js');




var router = {

	isPoint: function (variable){
		try{
			if(variable instanceof Point){
				return true;
			} else {
				throw TypeError("variable is not of type Point", "libraries/space.js", 5);
			}
		} catch(err){
			console.log(err);
		}
	},

	isTrajectory: function (variable){
		try{
			if(variable instanceof Trajectory){
				return true;
			} else {
				throw TypeError("variable is not of type Trajectory", "libraries/space.js", 5);
			}
		} catch(err){
			console.log(err);
		}	
	}

}


// export const sqrt = Math.sqrt;
// export function square(x) {
//     return x * x;
// }
// export function diag(x, y) {
//     return sqrt(square(x) + square(y));
// }

// export check;

module.exports = router;

