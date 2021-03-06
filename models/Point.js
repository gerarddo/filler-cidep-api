// var check = require('../tools/check');
var approx = require('../tools/approx')
var dimProcessor = require("../libraries/dimProcessor")
// var space = require("../libraries/space")
var math = require("../tools/math")

class Point{

	constructor(x, f, g){
		this.value = [x, f, g]
	}

	get value(){return this._value}
	set value(array){
		if(array[2]===undefined){
			throw new TypeError("Point is missing a component")
		}
		this._value = array
	}

	get norm(){
		let norm = 0
		for(var i = 0; i < this.value.length - 1; i++){
			norm += Math.pow(this.value[i], 2)
		}
		return approx.round(Math.sqrt(norm), 1000000)
	}


	// dot product
	// dot(point){ 
	// 	let product = 0
	// 	for(var i = 0; i < point.value.length; i++){
	// 		product += this.value[i]*point.value[i]
	// 	}
	// 	return product
	// }
	scale(scalar){
		let vector =  this.value

		// console.log("from scale")
		// console.log(vector)

		let scaledVector = vector.map((component) => {
			return component*scalar
		})

		// console.log(scaledVector)


		return new Point(...scaledVector)
	}

	distanceTo(point){
		let distance = 0
		for(var i = 0; i < point.value.length; i++){
			distance += Math.pow(this.value[i] - point.value[i], 2)
		}
		// return Math.sqrt(distance)
		return approx.round(Math.sqrt(distance), 1000000)
	}

	XYangleTo(point){

		let thisX = this.value[0]
		let thisY = this.value[1]

		let pointX = point.value[0]
		let pointY = point.value[1]
		let rotatedValue = rotateValueOnXY([pointX, pointY], 10)

		let thisDotPoint = thisX*pointX + thisY*pointY
		let thisDotRotPoint = thisX*rotatedValue[0] + thisY*rotatedValue[1]

		let thisNorm = Math.sqrt(Math.pow(thisX, 2) + Math.pow(thisY, 2))
		let pointNorm = Math.sqrt(Math.pow(pointX, 2) + Math.pow(pointY, 2))
		let rotatedValueNorm = Math.sqrt(Math.pow(rotatedValue[0], 2) + Math.pow(rotatedValue[1], 2))

		let angle = math.toDegrees(Math.acos(thisDotPoint/(thisNorm*pointNorm)))
		let testAngle = math.toDegrees(Math.acos(thisDotRotPoint/(thisNorm*rotatedValueNorm)))

		if( testAngle < angle){
			angle = -angle
		}

		// return angle
		return approx.round(angle, 10000000000)
	}
}

module.exports = Point;


function rotateValueOnXY(pointValue, angle){
	let value = pointValue
	let angleInRadians = math.toRadians(angle)
	let rotatedX = value[0]*Math.cos(angleInRadians) - value[1]*Math.sin(angleInRadians)
	let rotatedY = value[0]*Math.sin(angleInRadians) + value[1]*Math.cos(angleInRadians)
	if(value[2]!== undefined){
		return [rotatedX, rotatedY, value[2]]
	} else {
		return [rotatedX, rotatedY]
	}
}
