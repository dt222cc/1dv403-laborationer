"use strict";

var rows = 4;
var cols = 4;

var Memory = {
    
    gameArray: [],
    turnedPictures: [],
    
    init: function(){
        
        Memory.gameArray = RandomGenerator.getPictureArray(rows, cols); // Retrieves and stores an array
        console.log(Memory.gameArray);
        
        Memory.buildBoard();
    },
    
    // Builds a board for the game
    buildBoard: function(){
        
        var turnCount = 0;
        var board = document.getElementById("board");
        var table = document.createElement("table");
        
        board.appendChild(table);
        
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
                
                Memory.clickEvent(a, turnCount);
                
                turnCount++;
            }
        }
    },
    
    clickEvent: function(aTagg, count){
        
        // Mouse click
        aTagg.addEventListener("click", function(e){
            console.log("click");
            Memory.turnPicture(aTagg, count);
        });
        
        // Keypress, enter
        aTagg.addEventListener("keydown", function(key){
            if (key.keyCode === 13){
                console.log("press");
                key.preventDefault();
                Memory.turnPicture(aTagg, count);
            }
        });
    },
    
    turnPicture: function(tile, turnCount){
        
        console.log("flip");
        
        var img = tile.getElementsByTagName("img")[0];
        
        // Can not turn what is already turned
        if (img.getAttribute("src") !== "pics/0.png"){
            return false;
        }
        
        Memory.turnedPictures.push(tile); // Store flipped tiles in an array (for function checkMatch)
        
        // Flip tile and show tile img
        if (Memory.turnedPictures.length <= 2){
            
            console.log(Memory.gameArray[turnCount]);
            
            img.getAttribute("src");
            img.setAttribute("src", "pics/" + Memory.gameArray[turnCount] + ".png");
        }
        
        // Two tiles are flipped > time to check for match
        if (Memory.turnedPictures.length === 2){
            
            // TODO - Timeout
            Memory.checkMatch(Memory.turnedPictures);
        }
    },
    
    checkMatch: function(){
        
        console.log("checking");
        
        
    },
};

window.onload = Memory.init();