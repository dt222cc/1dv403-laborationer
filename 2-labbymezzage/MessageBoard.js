"use strict";

window.onload = function(){

    // Skapa meddelanden, test (funkar)
    var mess = new Message("Testmeddelande", new Date());
    
    alert(mess);
    alert(mess.getText());
    mess.setText("En annan text");
    alert(mess);
    alert(mess.getText());
};