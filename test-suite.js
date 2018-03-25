var text = require('./tools/text');
var approx = require('./tools/approx');

// var Square = require("./models/polygon/Square")
// var Cuboid = require("./models/scaffold/Cuboid")
// var Cylinder = require("./models/scaffold/Cylinder")
var CustomPolygon = require("./models/polygon/CustomPolygon")
var Prism = require("./models/scaffold/Prism")

var Point = require("./models/Point")
var Plank = require("./models/Plank")
var Polygon = require("./models/Polygon")
var Scaffold = require("./models/Scaffold")


// testCuboid = new Cuboid(10.18233764, 2.4, 2, 1)
// testCylinder = new Cylinder(5, 1, 2, 1)

let values = [
	[-8, 0],
	[-14, 14],
	[0, 22],
	[14, 14],
	[8, 2]
]



let testPrism = new Prism(values, 2.5,  20, 0.4)

console.log(testPrism.value)



// let point1 = new Point(-0.8, 0, 0)
// let point2 = new Point(-1.4, 1.4, 0)
// let point3 = new Point(0, 2.2, 0)
// let point4 = new Point(1.4, 1.4, 0)
// let point5 = new Point(0.8, 0.2, 0)



// console.log(testScaffold.toGcode());

text.saveString(testPrism.toGcode(), "public/web/examples/current/normal.gcode")
// text.saveString(testScaffold.toCIDEPGcode(), "public/web/examples/current/CIDEP.gcode")


// console.log(pentagonPlank.toGcode())



// console.log(approx.equal(a,b))




