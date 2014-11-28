"use strict";

var MessageBoard = {
    
    messages: [],
    
    init: function(){
        
        var submitButton = document.getElementById("button"); // Reference to the send button
        var textArea = document.getElementById("area"); // Reference to the text field
        
        // Submit button creates a new message
        submitButton.addEventListener("click", function(){
            MessageBoard.createMessage();
        });
            
        // Pressing enter creates a new message, shift+enter doesn't
        textArea.addEventListener("keydown", function(key){
            if (key.keyCode === 13 && key.shiftKey === false){ // The key code for enter is 13
                key.preventDefault(); // Prevents new line when pressing enter
                MessageBoard.createMessage(); // Calls the createMessage function
            }
        });
    },
    
    createMessage: function(){
        
        var textArea = document.getElementById("area");
        
        // // Text area can not be empty
        if (textArea.value !== ""){
            
            // Creates a new object with text (from textArea) and date
            var mess = new Message(textArea.value, new Date());
            
            MessageBoard.messages.push(mess); // Adds object to array
            console.log(MessageBoard.messages.toString()); // Console log
            MessageBoard.renderMessages(); // Renders messages
            MessageBoard.renderAmountOfMessages(); // Updates messages counter
            textArea.value = ""; // Clears textArea after a submit
        }
    },
    
    // Renders all messages
    renderMessages: function(){
        
        var i;
        var board = document.getElementById("messages");
        
        board.innerHTML = ""; // Removes all messages before rendering new ones
        
        for (i = 0; i < MessageBoard.messages.length; ++i){
            MessageBoard.renderMessage(i);
        }
    },
    
    // Renders a message
    renderMessage: function(messageID){
        
        var board = document.getElementById("messages"); // Reference to message field
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
        messageParagraph.innerHTML = MessageBoard.messages[messageID].getHTMLText();
        timeParagraph.className = "timeP";
        timeParagraph.innerHTML = MessageBoard.messages[messageID].getTime(); // Time in 00:00:00
        
        removeMessage.src = "pics/delete.png";
        removeMessage.alt = "delete message";
        timeStamp.src = "pics/clock.png";
        timeStamp.alt = "show time written";
        
        a.setAttribute("href", "#");
        a2.setAttribute("href", "#");
        
        // Appends elements where they should be
        a.appendChild(timeStamp);
        a2.appendChild(removeMessage);
        message.appendChild(a2);
        message.appendChild(a);
        message.appendChild(messageParagraph);
        message.appendChild(timeParagraph);
        board.appendChild(message);
        
        // Deletes message on click (with confirm window)
        removeMessage.addEventListener("click", function(){ // With addEventListener
            if (window.confirm("Vill du verkligen radera meddelandet?")){
                MessageBoard.messages.splice(messageID, 1); // Removes message from array
                MessageBoard.renderMessages(); // Updates messages
                MessageBoard.renderAmountOfMessages(); // Updates message counter
                console.log(MessageBoard.messages.toString()); // Console log
            }
        });
        
        // Shows the written date/time, on click (with alert window)
        timeStamp.addEventListener("click", function(){
            // Gets the object's creation date
            window.alert("Inlägget skapades " + MessageBoard.messages[messageID].getDateText());
        });
    },
    
    // Updates messages counter
    renderAmountOfMessages: function(){
        
        var amount = document.getElementById("amountOfMessages");
        var amountParagraph = document.createElement("p");
        
        amount.innerHTML = "";
        amountParagraph.innerHTML = "Antal meddelanden : " + MessageBoard.messages.length;
        amount.appendChild(amountParagraph);
    },
};
window.onload = MessageBoard.init;