"use strict";

var rows = 4;
var cols = 4;

var Memory = {
    
    init: function(){
        
        var newGame = RandomGenerator.getPictureArray(rows, cols); // Retrieves and stores an array
        console.log(newGame);
        
        Memory.buildBoard();
    },
    
    // Builds a board for the game
    buildBoard: function(){

        var game = document.getElementById("board");
        var table = document.createElement("table");
        
        game.appendChild(table);
        
        // Creates rows for table
        for (var row = 0; row < rows; row++){
            
            var tr = document.createElement("tr");
            
            table.appendChild(tr);
            
            // Creates a columns for each row
            for (var col = 0; col < cols; col++){
              
                var td = document.createElement("td");
                
                var a = document.createElement("a");
                a.setAttribute("href", "#");
                
                var img = document.createElement("img");
                img.src = "pics/0.png";
                
                a.appendChild(img), td.appendChild(a), tr.appendChild(td);
                
                this.clickEvent(a);
            }
        }
    },
    
    clickEvent: function(a){
        
        // Mouse click
        a.addEventListener("click", function(){
            console.log("Hej");
        });
        
        // Keypress, enter
        a.addEventListener("keydown", function(key){
            if (key.keyCode === 13){
                // console.log("extra"); // bug: adds mouse click aswell
                // Works empty, why?
            }
        });
        
    },
    
    
};

window.onload = Memory.init;
