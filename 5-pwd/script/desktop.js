"use strict";

var Desktop = {
    
    deskFooter: document.querySelector("#deskFooter"),
    
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
        Desktop.deskFooter.appendChild(aViewer);
    }
};

window.onload = new Desktop.init();