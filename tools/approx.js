var EPSILON = 1000000;

/**
 * Test whether a value is a number
 * @param {*} value
 * @returns {boolean}
 */
function isNumber (value) {
  return (value instanceof Number || typeof value === 'number');
}

/**
 * Test whether two values are approximately equal. Tests whether the difference
 * between the two numbers is smaller than a fraction of their max value.
 * @param {Number} a
 * @param {Number} b
 * @param {Number} [epsilon]
 */

router = {

    equal: function equal(a, b, epsilon) {
        if (epsilon === undefined) {
            epsilon = EPSILON;
        }

        if (isNumber(a) && isNumber(b)) {
            if (a === b) {
                return true
            } else if (a === 0) {
                return Math.abs(b) < epsilon ? true : false;
            } else if (b === 0) {
                return Math.abs(a) < epsilon ? true : false;
            } else {
                return Math.abs(a - b) < epsilon ? true : false;
            }
        } else {
            console.log("error at approx.js: .equal")
        }
    },

    round: function approximate(data, magnitude){
        if (magnitude === undefined) {
            magnitude = EPSILON;
        }
        if(isNumber(data)){
            return Math.round(data*magnitude)/magnitude
        } 
        if(Array.isArray(data)){
            let roundedData = []
            let i = 0
            data.forEach((component) => {
                roundedData[i] = Math.round(component*magnitude)/magnitude
                i++
            })
            return roundedData
        }
    }
}

module.exports = router;

// exports.equal = function equal(a, b, epsilon) {
//   if (epsilon === undefined) {
//     epsilon = EPSILON;
//   }

//   if (isNumber(a) && isNumber(b)) {
//     if (a === b) {
//       return true
//     } else if (a === 0) {
//       return Math.abs(b) < epsilon ? true : false;
//     } else if (b === 0) {
//       return Math.abs(a) < epsilon ? true : false;
//     } else {
//       return Math.abs(a - b) < epsilon ? true : false;
//     }
//   }
//   else {
//     console.log("error at approx.js: .equal")
//   }
// };


// exports.round = function approximate(data, magnitude){
//     if (magnitude === undefined) {
//       magnitude = EPSILON;
//     }

//     if(isNumber(data)){
//        // return Math.round(data*epsilon)*epsilon
//        return Math.round(data*magnitude)/magnitude
//       // return data
//     } 

//     if(Array.isArray(data)){
//       if(data[0][0]!=undefined){
//         return data.map(point => [ Math.round(point[0]*magnitude)/magnitude, Math.round(point[1]*magnitude)/magnitude])
//       } else {
//         return [ Math.round(data[0]*magnitude)/magnitude, Math.round(data[1]*magnitude)/magnitude]
//       }
//     }
// }















