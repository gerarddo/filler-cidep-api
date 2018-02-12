

router = {
    stablishDim: function(dim){
        try{
            if (!(dim === "x" | dim === "y" | dim === "z" | dim === "f" | dim === "g" | dim === 0 | dim === 1)){
                throw new TypeError('dim is not a valid dimension', "models/Trajectory.js", 5);
                return null
            }
        } catch(err) {
            console.log(err)
        }
        switch (dim) {
        case "x":
            return 0
            break;
        case "y":
            return 1
            break;
        case "f":
            return 1
            break;
        case "z":
            return 2
            break;
        case "g":
            return 2
            break;
        }
        return dim
    }
}

module.exports = router
