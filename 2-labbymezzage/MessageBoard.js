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
    
    // Renders all messages
    var renderMessages = function(){
        
        var i;
        
        board.innerHTML = ""; // Remove all messages before rendering new ones
        
        for(i = 0; i < messages.length; ++i){
            renderMessage(i);
        }
    };
    
    // Renders a message
    var renderMessage = function(messageID){
        
        var message;
        var removeMessage;
        var timeStamp;
        var timeParagraph;

        // Render the text
        message = document.createElement("div"); // Create a new div element as "the" message
        message.className = "message"; // Add class name
        message.innerHTML = messages[messageID].getHTMLText(); // Add text to message
        board.appendChild(message); // Place message inside the "container"
        
        // Render "time" text
        timeParagraph = document.createElement("p");
        timeParagraph.className = "time";
        timeParagraph.innerHTML = messages[messageID].getTime();
        message.appendChild(timeParagraph);
        
        // Create a delete icon for the message
        removeMessage = document.createElement("img"); // Create a new img element
        removeMessage.src = "pics/delete.png"; // Add source
        removeMessage.className = "messageIcons";
        removeMessage.alt = "delete message"; // Add alt text
        message.insertBefore(removeMessage, message.firstChild);// Place inside the message

        // Create a clock icon for the message
        timeStamp = document.createElement("img");
        timeStamp.src = "pics/clock.png";
        timeStamp.className = "messageIcons";
        timeStamp.alt = "show time written";
        message.insertBefore(timeStamp, message.firstChild);
        
        // Delete message on click (confirm window)
        removeMessage.addEventListener("click", function(){ // Testing with .addEventListener
            if (window.confirm("Vill du verkligen radera meddelandet?")){
                messages.splice(messageID, 1); // Remove message from array
                renderMessages(); // Uppdate messages
                renderAmountOfMessages(); // Update message counter
            }
        });
        
        // Show date/time written, on click (alert window)
        timeStamp.addEventListener("click", function(){
            window.alert("Inlägget skapades " + messages[messageID].getDateText()); // Get the object's creation date
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