// var functions = require("./libraries/functions")
// var approx = require("./tools/approx")
var Point = require('./models/Point.js');
// var Trajectory = require('./models/Trajectory.js');
// var Scaffold = require('./models/Scaffold.js');
// var Polygon = require('./models/Polygon.js');
var Circle = require('./models/polygon/Circle.js');
var Square = require('./models/polygon/Square.js');
var Plank = require('./models/Plank.js');


let step = 0.2
let z = 0.1



var Cylinder = require("./models/scaffold/Cylinder")
var Cuboid = require("./models/scaffold/Cuboid")




// var testCylinder = new Cylinder(15, 2.5, 1.6, 0.4)
var testCuboid = new Cuboid(9.8994949, 1, 1.6, 0.4)


// console.log(testCylinder.toGcode(new Point(-30, 0 ,0), "F4"))
console.log(testCuboid.toCIDEPGcode(new Point(-30, 0 ,0), "F4"))

// // ------------------------------------


// var fs = require("fs");
// var textByLine = ""

// fs.readFile(".public/arrays/verticesStlRoscaTest1.txt", function(text){
//     textByLine = text.split("\n")
// });

// console.log(textByLine)