"use strict";

var Desktop = {
    
    bottom: document.querySelector("#bottom"),
    
    init: function() {
        Desktop.createImageViewer();
    },
    
    createImageViewer: function() {
    
        var imgViewer = document.createElement("img");
        imgViewer.src = "pics/imageviewer-icon.png";
        imgViewer.alt = "Open Image Viewer.";
        
        var aViewer = document.createElement("a");
        aViewer.href = "#";
        aViewer.title = "Image Viewer";
        aViewer.alt = "Open Image Viewer.";
        aViewer.className = "aIcon";
        
        aViewer.onclick = function(){
            new ImageViewer.init();
        };
        
        aViewer.appendChild(imgViewer);
        this.bottom.appendChild(aViewer);
    }
};