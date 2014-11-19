"use strict";

window.onload = function(){

    var messages = [];
    var mess = {};
    var board = document.getElementById("messages"); // Reference to message field
    var textArea = document.getElementById("area"); // Reference to the text field
    var submitButton = document.getElementById("button"); // Reference to the send button
    
    // Submit button creates a new message
    submitButton.onclick = function createMessage(){
        
        mess = new Message(textArea.value, new Date()); // Create a new object with text and date
        messages.push(mess); // Add object to array

        console.log(messages[0].toString()); // Print 
        renderMessage(messages.length-1); // Each object
        renderAmountOfMessages(); // Update messages counter
    };
        
    var renderMessages = function(){
        
        var i;
        
        board.innerHTML = ""; // Remove all messages
        
        // Render all messages
        for(i = 0; i < messages.length; ++i){
            renderMessage(i);
        }
    };
    
    var renderMessage = function(messageID){
        
        var div = document.getElementById("messages"); // Get the div element with id="messages"
        
        // Message text
        var text = document.createElement("div"); // Create a new element
        text.className = "message"; // Add class="message"
        text.innerHTML = messages[messageID].getHTMLText(); // Add text
        div.appendChild(text); // Place inside the div element at the end
    };
    
    // Update messages counter
    var renderAmountOfMessages = function(){
        
        var amount = document.getElementById("amountOfMessages");
        amount.innerHTML = "";
        
        var amountParagraph = document.createElement("p");
        amountParagraph.innerHTML = "Antal meddelanden : " + messages.length;
        amount.appendChild(amountParagraph);
    };
};