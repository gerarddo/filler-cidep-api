// var text = require('./tools/text');
var approx = require('./tools/approx');

// var Square = require("./models/polygon/Square")
// var Cuboid = require("./models/scaffold/Cuboid")
// var Cylinder = require("./models/scaffold/Cylinder")

// var Point = require("./models/Point")
// var Plank = require("./models/Plank")

// testCuboid = new Cuboid(10.18233764, 2.4, 2, 1)
// testCylinder = new Cylinder(5, 1, 2, 1)

// text.saveString(testCuboid.toCIDEPGcode(), "public/web/examples/current.gcode")


let a = [0,0,0.000000000000001];
let b = [0,0,0];

console.log(approx.equal(a,b))




