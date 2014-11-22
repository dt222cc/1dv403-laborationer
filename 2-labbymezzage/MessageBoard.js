"use strict";

window.onload = function(){

    var messages = [];
    var mess = {};
    var board = document.getElementById("messages"); // Reference to message field
    var textArea = document.getElementById("area"); // Reference to the text field
    var submitButton = document.getElementById("button"); // Reference to the send button
    
    // Submit button creates a new message
    submitButton.onclick = function createMessage(){
        mess = new Message(textArea.value, new Date()); // Creates a new object with text (from textArea) and date
        messages.push(mess); // Adds object to array
        console.log(messages.toString()); // Console log
        renderMessages(); // Renders messages
        renderAmountOfMessages(); // Updates messages counter
        textArea.value = ""; // Clear textArea after a submit
    };
    
    // Pressing enter creates a new message, shift+enter doesn't
    textArea.onkeypress = function(key){
        // The key code for enter is 13
        if (key.keyCode === 13 && key.shiftKey === false){
            key.preventDefault(); // Prevents making a new line when pressing enter
            submitButton.onclick(); // Calls the createMessage function
        }
    };
    
    // Renders all messages
    var renderMessages = function(){
        
        var i;
        
        board.innerHTML = ""; // Removes all messages before rendering new ones
        
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

        // Renders the text
        message = document.createElement("div"); // Creates a new div element as "the" message
        message.className = "message"; // Adds class name
        message.innerHTML = messages[messageID].getHTMLText(); // Adds text to message
        board.appendChild(message); // Puts the message inside the "container"
        
        // Renders the "time" text
        timeParagraph = document.createElement("p");
        timeParagraph.className = "time";
        timeParagraph.innerHTML = messages[messageID].getTime();
        message.appendChild(timeParagraph);
        
        // Creates a delete icon for the message
        removeMessage = document.createElement("img"); // Creates a new img element
        removeMessage.src = "pics/delete.png"; // Adds source
        removeMessage.className = "messageIcons";
        removeMessage.alt = "delete message"; // Adds alt text
        message.insertBefore(removeMessage, message.firstChild);// Puts the icon inside the message

        // Creates a clock icon for the message
        timeStamp = document.createElement("img");
        timeStamp.src = "pics/clock.png";
        timeStamp.className = "messageIcons";
        timeStamp.alt = "show time written";
        message.insertBefore(timeStamp, message.firstChild);
        
        // Deletes message on click (with confirm window)
        removeMessage.addEventListener("click", function(){ // Testing with .addEventListener
            if (window.confirm("Vill du verkligen radera meddelandet?")){
                messages.splice(messageID, 1); // Removes message from array
                renderMessages(); // Updates messages
                renderAmountOfMessages(); // Updates message counter
                console.log(messages.toString()); // Console log
            }
        });
        
        // Shows the written date/time, on click (with alert window)
        timeStamp.addEventListener("click", function(){
            window.alert("Inlägget skapades " + messages[messageID].getDateText()); // Gets the object's creation date
        });
    };
    
    // Updates messages counter
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