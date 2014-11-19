"use strict";

window.onload = function(){

    var messages = [];
    var mess = {};
    
    // Reference to the text field
    var textArea = document.getElementById("area");
    
    // Reference to the send button
    var submitButton = document.getElementById("button");
    
    // Skicka meddelanden
    submitButton.onclick = function createMessage(){
        
        mess = new Message(textArea.value, new Date());
        messages.push(mess);
        
        console.log(messages[0].toString());
    };
};