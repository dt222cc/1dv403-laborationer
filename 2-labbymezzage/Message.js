"use strict";

function Message(message, date){
    
    // Constructors for messages
    this.getText = function(){
        return message;
    };
    
    this.setText = function(_text){
        message = _text;
    };
    
    // Constructors for dates
    this.getDate = function(){
        return date;
    };
    
    this.setDate = function(_date){
        date = _date;
    };
    
    this.getTime = function(){
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    };
}
    
    // String representation of the object
    Message.prototype.toString = function(){
        return this.getText() + " ("+this.getDate() + ")";
    };
    
    // Replaces text with \n and \r to <br />
    Message.prototype.getHTMLText = function(){
        return this.getText().replace(/[\n\r]/g, "<br>");
    };
    
    // Configures date text - TODO: remove timezone (if necessary)
    Message.prototype.getDateText = function(){
        return " (" + this.getDate() + ")";
    };