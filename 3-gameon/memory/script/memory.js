"use strict";

var rows = 4;
var cols = 4;

var Memory = {
    
    gameArray: [],
    turnedPictures: [],
    guesses: 0,
    matches: 0,
    
    init: function(){
        
        Memory.gameArray = RandomGenerator.getPictureArray(rows, cols); // Retrieves and stores an array
        console.log(Memory.gameArray);
        
        Memory.buildBoard();
    },

    // Builds a board for the game
    buildBoard: function(game){
        
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
    
    // Click event for mouse click and keypress (enter)
    clickEvent: function(aTagg, count){
        
        // Mouse click
        aTagg.addEventListener("click", function(e){
            Memory.turnPicture(aTagg, count);
        });
        
        // Keypress, enter
        aTagg.addEventListener("keydown", function(key){
            if (key.keyCode === 13){
                key.preventDefault();
                Memory.turnPicture(aTagg, count);
            }
        });
    },
    
    // Turns selected tile/tiles
    turnPicture: function(tile, turnCount){
        
        var img = tile.getElementsByTagName("img")[0];
        
        // Can not turn what is already turned
        if (img.getAttribute("src") !== "pics/0.png"){
            return false;
        }
        
        Memory.turnedPictures.push(tile); // Store flipped tiles in an array (for function checkMatch)
        
        // Flip tile and show/get tile img
        if (Memory.turnedPictures.length <= 2){
            console.log(Memory.gameArray[turnCount]);
            
            img.getAttribute("src");
            img.setAttribute("src", "pics/" + Memory.gameArray[turnCount] + ".png");
        }
        
        // Two tiles are flipped > time to check for match
        if (Memory.turnedPictures.length === 2){
            setTimeout(function(){
                Memory.checkMatch(Memory.turnedPictures);
            }, 900);
        }
    },
    
    // Checks if selected two tiles match
    checkMatch: function(tiles){

        Memory.guesses++;
        
        // If tiles match, they stay turned
        if (tiles[0].getElementsByTagName("img")[0].getAttribute("src") === tiles[1].getElementsByTagName("img")[0].getAttribute("src")){
            Memory.turnedPictures = []; // Array gets emptied for next set of guess
            Memory.matches++;
            
            if (Memory.matches === 8){
                var result = document.getElementById("result");
                
                var text = document.createElement("p");
                text.innerHTML = ("Grattis! Du klarade spelet på " +Memory.guesses+ " försök. Vill du köra igen? ");
                
                var reset = document.createElement("input");
                reset.type = "submit", reset.value ="ja";
                
                text.appendChild(reset);
                result.appendChild(text);
                
                Memory.playAgain(reset);
                
                // if (window.confirm("Grattis! Du klarade spelet på " +Memory.guesses+ " försök. Vill du köra igen?")){
                //     location.reload();
                // }
            }
        }
        // If not a match, flip them back to the default "backside" image
        else {
            tiles[0].getElementsByTagName("img")[0].setAttribute("src", "pics/0.png");
            tiles[1].getElementsByTagName("img")[0].setAttribute("src", "pics/0.png");
            
            Memory.turnedPictures = []; // Array gets emptied for next set of guess
        }
    },
    
    playAgain: function(yes){
        
        // Mouse click
        yes.addEventListener("click", function(e){
            location.reload();
        });
        
        // Keypress, enter
        yes.addEventListener("keydown", function(key){
            if (key.keyCode === 13){
                key.preventDefault();
                location.reload();
            }
        });
    },
};

window.onload = Memory.init();