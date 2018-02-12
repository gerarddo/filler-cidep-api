//convierte angulo de grados a radianes
function toRadians(angle){
    return (angle/180)*Math.PI
}

function toDegrees(angle){
	return (angle/Math.PI)*180
}
//tells me the slope from one point to the other with respect to the x axis. Takes 1x2 arrays as argument
function slope(pf, pi){
	return (pf[1] - pi[1])/(pf[0] - pi[0])
}

function interceptDependentAxis(point, m){
	// returns value of b from linear equation f = m*x + b
	return point[1] - m*point[0]
}

function addToDim(value, points, dim){

	for(var i = 0; i < points.length; i++){
		points[i][dim] = points[i][dim] + value
	}
	return points
}


module.exports = {
  toRadians: toRadians,
  slope: slope,
  interceptDependentAxis: interceptDependentAxis,
  addToDim: addToDim,
  toDegrees: toDegrees
};