"use strict";

var Window = {
    
    createWindow: function(name) {
        
        var content = document.querySelector("#content");
        var windowDiv = document.createElement("div");
        windowDiv.className = "windowDiv";
        
        // Header
        var windowHeader = document.createElement("header");
        windowHeader.className = "appHeader";
          
        var headerText = document.createElement("p");
        headerText.className = "headerText";
        headerText.innerHTML = name.replace(/([a-z])([A-Z])/g, '$1 $2');
        
        var imgHeader = document.createElement("img");
        imgHeader.src = "pics/" + name.toLowerCase() + "-icon.png";
        
        var imgClose = document.createElement("img");
        imgClose.src = "pics/close-icon.png";
        imgClose.alt = "Close button";
        
        var aClose = document.createElement("a");
        aClose.href = "#";
        aClose.title = "Close app";
        aClose.onclick = function(){
            content.removeChild(windowDiv);
        };
        
        aClose.appendChild(imgClose),
        windowHeader.appendChild(imgHeader),
        windowHeader.appendChild(headerText),
        windowHeader.appendChild(aClose);
        
        // Container
        var windowContainer = document.createElement("div");
        windowContainer.className = "appContainer";
        windowContainer.classList.add(name);
        
        windowDiv.appendChild(windowHeader),  windowDiv.appendChild(windowContainer),
        content.appendChild(windowDiv);  
    },
};