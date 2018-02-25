// var functions = require("./libraries/functions")
// var approx = require("./tools/approx")
var text = require('./tools/text');
// var Trajectory = require('./models/Trajectory.js');

text.saveString("G1 X0 Y0 Z0 \n G1 X1 Y1 Z1", "public/web/examples/current.gcode")
