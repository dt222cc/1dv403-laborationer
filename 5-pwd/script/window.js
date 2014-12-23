"use strict";

var Window = {
    
    createWindow: function(name) {
        
        var content = document.querySelector("#content");
        
        var appWindow = document.createElement("div");
        appWindow.className = "appWindow";
        appWindow.classList.add(name);
        content.appendChild(appWindow); 
        
        // Header
        var windowHeader = document.createElement("header");
        windowHeader.className = "appHeader";
         
        var imgHeader = document.createElement("img");
        imgHeader.src = "pics/" + name.toLowerCase() + "-icon.png";
        windowHeader.appendChild(imgHeader);
        
        var headerText = document.createElement("p");
        headerText.className = "headerText";
        headerText.innerHTML = name.replace(/([a-z])([A-Z])/g, '$1 $2');
        windowHeader.appendChild(headerText);

        var imgClose = document.createElement("img");
        imgClose.src = "pics/close-icon.png";
        imgClose.alt = "Close button";
        
        var aClose = document.createElement("a");
        aClose.href = "#";
        aClose.title = "Close app";
        aClose.appendChild(imgClose),
        
        aClose.onclick = function(){
            content.removeChild(appWindow);
        };
        
        windowHeader.appendChild(aClose);
        appWindow.appendChild(windowHeader);
        
        // Container
        var windowContainer = document.createElement("div");
        windowContainer.className = "appContainer";
        windowContainer.classList.add(name.toLowerCase());
        appWindow.appendChild(windowContainer);
        
        // Footer
        var windowFooter = document.createElement("footer");
        windowFooter.className = "appFooter";
        
        var loading = document.createElement("div");
        loading.className = "loading";
        
        var loaderGIF = document.createElement("img");
        loaderGIF.src = "pics/ajax-loader.gif";
        loaderGIF.className = "loader";
        loading.appendChild(loaderGIF);
        
        var footerText = document.createElement("p");
        footerText.innerHTML = "Loading";
        loading.appendChild(footerText),
        windowFooter.appendChild(loading),

        appWindow.appendChild(windowFooter);
    },
};