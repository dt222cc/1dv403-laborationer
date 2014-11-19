"use strict";

window.onload = function(){

    var messages = [];
    var mess = {};
    
    // Skapa meddelanden
    mess = new Message("Första meddelanden", new Date());
    messages.push(mess);
    
    // Testar första objekt i arrayen
    console.log(messages[0].toString());
    
    // Testar andra objekt i arrayen
    var mess2 = new Message("Andra meddelanden", new Date());
    messages.push(mess2);
    console.log(messages[1].toString());
    
    // Andra tester
    console.log(mess.getText());
    mess.setText("En annan text");
    console.log(mess.getText());
    console.log(mess.getDate());
};