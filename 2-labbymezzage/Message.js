"use strict";

function Message(message, date){
    
    // Konstruktor för meddelanden
    this.getText = function(){
        return message;
    };
    
    this.setText = function(_text){
        message = _text;
    };
    
    // Konstruktor för datum
    this.getDate = function(){
        return date;
    };
    
    this.setDate = function(_date){
        date = _date;
    };
}
    
    // Strängrepresentation av objektet
    Message.prototype.toString = function(){
        return this.getText() +" ("+this.getDate()+")";
    };
    
    // Hämtar texten med \n och byter ut den mot <br />
    Message.prototype.getHTMLText = function(){
        return this.getText().replace(/\n/g, "<br>");
        // http://stackoverflow.com/questions/5076466/javascript-replace-n-with-br
    };
    
    // 
    Message.prototype.getDateText = function(){
        return " ("+this.getDate()+")"; // Ska modifieras vidare? bort med GMT
    };