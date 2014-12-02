"use strict";

function Memory(row, col, gameID){
    
    var rows = row;
    var cols = col;
    var gameArray = [];
    var turnedPictures = [];
    var guesses = 0;
    var matches = 0;
    var board = document.getElementById(gameID);
    var reset = document.getElementById("reset");
    
    gameArray = RandomGenerator.getPictureArray(rows, cols); // Retrieves and stores an array
    console.log(gameArray);
    
    playAgain(reset);
    
    buildBoard(gameID);

    // Builds a board for the game
    function  buildBoard(){
        
        var turnCount = 0;
        
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
                img.src = "../pics/0.png";
                
                a.appendChild(img), td.appendChild(a), tr.appendChild(td);
                
                clickEvent(a, turnCount);
                
                turnCount++;
            }
        }
    }
    
    // Click event for mouse click and keypress (enter)
    function clickEvent(aTagg, count){
        
        // Mouse click
        aTagg.addEventListener("click", function(e){
            turnPicture(aTagg, count);
        });
        
        // Keypress, enter
        aTagg.addEventListener("keydown", function(key){
            if (key.keyCode === 13){
                key.preventDefault();
                turnPicture(aTagg, count);
            }
        });
    }
    
    // Turns selected tile/tiles
    function turnPicture(tile, turnCount){
        
        var img = tile.getElementsByTagName("img")[0];
        
        // Can not turn what is already turned
        if (img.getAttribute("src") !== "../pics/0.png"){
            return false;
        }
        
        turnedPictures.push(tile); // Store flipped tiles in an array (for function checkMatch)
        
        // Flip tile and show/get tile img
        if (turnedPictures.length <= 2){
            console.log(gameArray[turnCount]);
            
            img.getAttribute("src");
            img.setAttribute("src", "../pics/" + gameArray[turnCount] + ".png");
        }
        
        // Two tiles are flipped > time to check for match
        if (turnedPictures.length === 2){
            setTimeout(function(){
                checkMatch(turnedPictures);
            }, 900);
        }
    }
    
    // Checks if selected two tiles match
    function checkMatch(tiles){

        guesses++;
        
        // If tiles match, they stay turned
        if (tiles[0].getElementsByTagName("img")[0].getAttribute("src") === tiles[1].getElementsByTagName("img")[0].getAttribute("src")){
            turnedPictures = []; // Array gets emptied for next set of guess
            matches++;
            
            if (matches === (rows * cols / 2)){
                var text = document.createElement("p");
                text.innerHTML = ("Grattis! Du klarade spelet på " +guesses+ " försök.");
                board.appendChild(text);
            }
        }
        // If not a match, flip them back to the default "backside" image
        else {
            tiles[0].getElementsByTagName("img")[0].setAttribute("src", "../pics/0.png");
            tiles[1].getElementsByTagName("img")[0].setAttribute("src", "../pics/0.png");
            
            turnedPictures = []; // Array gets emptied for next set of guess
        }
    }
    
    function playAgain(yes){
        
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
    }
}