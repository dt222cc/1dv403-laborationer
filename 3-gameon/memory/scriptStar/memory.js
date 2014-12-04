"use strict";

function Memory(rows, cols, gameID){
    
    var turnedPictures = [];
    var guesses = 0;
    var matches = 0;
    var board = document.getElementById(gameID);
    var reset = document.getElementById("reset");
    
    var gameArray = RandomGenerator.getPictureArray(rows, cols); // Retrieves and stores an array
    console.log(gameArray);
    
    resetButton();
    buildBoard();

    // Builds a board for the game
    function  buildBoard(){
        
        var imgCount = 0;
        var table = document.createElement("table");
        
        // Creates rows for table
        for (var row = 0; row < rows; row++){
            
            var tr = document.createElement("tr");
            
            // Creates a columns for each row
            for (var col = 0; col < cols; col++){
              
                var td = document.createElement("td");
                var a = document.createElement("a");
                var img = document.createElement("img");
                
                a.setAttribute("href", "#");
                img.src = "../pics/0.png";
                
                a.appendChild(img), td.appendChild(a), tr.appendChild(td);
                
                clickEvent(a, imgCount);
                imgCount++;
            }
            table.appendChild(tr);
        }
        board.appendChild(table);
    }
    
    // Event listener for <a> (mouse click and keypress: enter)
    function clickEvent(aTagg, count){
        
        aTagg.addEventListener("click", function(){
            turnPicture(aTagg, count);
        });
        
        aTagg.addEventListener("keydown", function(key){
            if (key.keyCode === 13){
                key.preventDefault();
                turnPicture(aTagg, count);
            }
        });
    }
    
    // Turns selected tile/tiles
    function turnPicture(tile, imgCount){
        
        var img = tile.getElementsByTagName("img")[0];
        
        // Can not turn what is already turned
        if (img.getAttribute("src") !== "../pics/0.png"){
            return false;
        }
        
        turnedPictures.push(tile); // Store flipped tiles in an array to check if they match or not
        
        // Flip tile and show/get tile img
        if (turnedPictures.length <= 2){
            console.log(gameArray[imgCount]);
            
            img.getAttribute("src");
            img.setAttribute("src", "../pics/" + gameArray[imgCount] + ".png");
        }
        
        // When two tiles have been flipped: checkMatch
        if (turnedPictures.length === 2){
            // Delay here: 900ms then checkMatch
            setTimeout(function(){
                checkMatch(turnedPictures);
            }, 900);
        }
    }
    
    // Checks if selected two tiles match.
    // After each check the array gets emptied for the next set of check.
    function checkMatch(tiles){

        guesses++;
        
        // If tiles match: they stay turned then reset the array.
        if (tiles[0].getElementsByTagName("img")[0].getAttribute("src") === tiles[1].getElementsByTagName("img")[0].getAttribute("src")){
            turnedPictures = [];
            matches++;
            
            // Game done (not optimal solution)
            if (matches === (rows * cols / 2)){
                var text = document.createElement("p");
                text.innerHTML = ("Grattis!<br />Försök: " +guesses);
                board.appendChild(text);
            }
        }
        // If not a match: flip them back to the "backside" image and reset the array.
        else {
            tiles[0].getElementsByTagName("img")[0].setAttribute("src", "../pics/0.png");
            tiles[1].getElementsByTagName("img")[0].setAttribute("src", "../pics/0.png");
            
            turnedPictures = [];
        }
        console.log("Tries  : " +guesses);
        console.log("Matches: " +matches);
    }
    
    // Event listener for reset button (mouseclick and keypress: enter)
    function resetButton(){
        
        reset.addEventListener("click", function(){
            location.reload();
        });
        
        reset.addEventListener("keydown", function(key){
            if (key.keyCode === 13){
                key.preventDefault();
                location.reload();
            }
        });
    }
}