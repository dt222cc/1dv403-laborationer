"use strict";

var Memory = {
    
    init: function(){
        
        console.log("4 * 4 = 16");
        var newGame = RandomGenerator.getPictureArray(4, 4); // Fetch and store array (rows, columns)
        console.log(newGame);
    },
    
};

window.onload = Memory.init;
