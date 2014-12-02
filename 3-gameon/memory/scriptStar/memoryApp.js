"use strict";

var MemoryApp = {
    
   init: function(){
       
      var mem1 = new Memory(4,4,"game1");
      var mem2 = new Memory(4,4,"game2");
   }
};

window.onload = MemoryApp.init();