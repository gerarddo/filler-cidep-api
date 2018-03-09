// var functions = require("./libraries/functions")
// // var approx = require("./tools/approx")
// var text = require('./tools/text');
// // var Trajectory = require('./models/Trajectory.js');

// text.saveString("G1 X0 Y0 Z0 \n G1 X1 Y1 Z1", "public/web/examples/current.gcode")


var Square = require("./models/polygon/Square")
var Cuboid = require("./models/scaffold/Cuboid")
var Point = require("./models/Point")

testVector = [1,3,0];

testPoint = new Point(...testVector);

// console.log(testPoint.scale(2))


// testSquare = new Square(10, 10)
testCuboid = new Cuboid(10, 1, 1, 1)

console.log(testCuboid.toCIDEPGcode("F4"))
// console.log(testCuboid._area)