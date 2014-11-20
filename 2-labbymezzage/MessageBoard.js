"use strict";

window.onload = function(){

    var messages = [];
    var mess = {};
    var board = document.getElementById("messages"); // Reference to message field
    var textArea = document.getElementById("area"); // Reference to the text field
    var submitButton = document.getElementById("button"); // Reference to the send button
    
    // Submit button creates a new message
    submitButton.onclick = function createMessage(){
        
        mess = new Message(textArea.value, new Date()); // Create a new object with text (from textArea) and date
        messages.push(mess); // Add object to array
        console.log(messages.toString()); // Console log
        renderMessages(); // Render messages
        renderAmountOfMessages(); // Update messages counter
    };
        
    var renderMessages = function(){
        
        var i;
        
        board.innerHTML = ""; // Remove all messages before rendering new
        // Render all messages
        for(i = 0; i < messages.length; ++i){
            renderMessage(i);
        }
    };
    
    var renderMessage = function(messageID){
        
        var text;
        var removeMessage;
        var timeStamp;

        // Render text
        text = document.createElement("div"); // Create a new div element
        text.className = "message"; // Add class name
        text.innerHTML = messages[messageID].getHTMLText(); // Add text
        board.appendChild(text); // Place inside the div element at the end
        
        // Creating delete icon
        removeMessage = document.createElement("img"); // Create a new img element
        removeMessage.src = "pics/delete.png"; // Add source
        removeMessage.className = "messageIcons";
        removeMessage.alt = "delete message"; // Add alt text
        text.appendChild(removeMessage); // Place inside the message
        
        // Delete message/messages
        removeMessage.addEventListener("click", function(){ // Testing with .addEventListener
            if (window.confirm("Är du säker på att du vill radera meddelandet?")){
                messages.splice(messageID, 1); // Remove message from array
                renderMessages(); // Uppdate messages
                renderAmountOfMessages(); // Update message counter
            }
        });
        
        // Creating clock icon
        timeStamp = document.createElement("img");
        timeStamp.src = "pics/clock.png";
        timeStamp.className = "messageIcons";
        timeStamp.alt = "show time written";
        text.appendChild(timeStamp);
        
        // Show time
        removeMessage.addEventListener("click", function(){
            
        });
    };
    
    // Update messages counter
    var renderAmountOfMessages = function(){
        
        var amount;
        var amountParagraph;
        
        amount = document.getElementById("amountOfMessages");
        amount.innerHTML = "";
        amountParagraph = document.createElement("p");
        amountParagraph.innerHTML = "Antal meddelanden : " + messages.length;
        amount.appendChild(amountParagraph);
    };
};