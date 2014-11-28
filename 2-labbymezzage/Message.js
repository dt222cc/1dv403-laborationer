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
}
    
    // String representation of the object
    Message.prototype.toString = function(){
        return this.getText() + " ("+this.getDate() + ")";
    };
    
    // Replaces text with \n and \r to <br />
    Message.prototype.getHTMLText = function(){
        return this.getText().replace(/[\n\r]/g, "<br>");
    };
    
    // Configures date text (gets current month (0-11) and match it with the array)
    Message.prototype.getDateText = function(){
    	var i = this.getDate().getMonth();
    	var months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
    	return +this.getDate().getDate()+" " +months[i]+" "+this.getDate().getFullYear()+" klockan "+this.getDate().toLocaleTimeString();
    };