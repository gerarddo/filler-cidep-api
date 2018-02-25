
var fs = require('fs');




var router = {

	saveString: function (string, path){


		fs.writeFile(path, string, function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		}); 



	}

}



module.exports = router;

