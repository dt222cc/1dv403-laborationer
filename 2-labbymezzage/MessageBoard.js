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
        if (key.keyCode === 13 && key.shiftKey === false){ // The key code for enter is 13
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
        
        var message = document.createElement("div"); // "The" message
        var messageParagraph = document.createElement("p"); // Text
        var timeParagraph = document.createElement("p"); // Time text
        var a = document.createElement("a");  // Link for timeStamp
        var a2 = document.createElement("a");  // Link for removeMessage
        var removeMessage = document.createElement("img"); // Delete message
        var timeStamp = document.createElement("img"); // Show date and time
        
        // Configuration
        message.className = "message";
        
        messageParagraph.className = "messageP";
        messageParagraph.innerHTML = messages[messageID].getHTMLText(); // Adds text to paragraph
        
        timeParagraph.className = "timeP";
        timeParagraph.innerHTML = messages[messageID].getTime(); // Time in 00:00:00
        
        removeMessage.src = "pics/delete.png";
        removeMessage.alt = "delete message";

        timeStamp.src = "pics/clock.png";
        timeStamp.alt = "show time written";
        
        a.setAttribute("href", "#");
        a2.setAttribute("href", "#");
        
        // Inserting
        a.appendChild(timeStamp);
        a2.appendChild(removeMessage);
        message.appendChild(a2);
        message.appendChild(a);
        message.appendChild(messageParagraph);
        message.appendChild(timeParagraph);
        board.appendChild(message);
        
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
        
        var amount = document.getElementById("amountOfMessages");
        var amountParagraph = document.createElement("p");
        
        amount.innerHTML = "";
        amountParagraph.innerHTML = "Antal meddelanden : " + messages.length;
        amount.appendChild(amountParagraph);
    };
};