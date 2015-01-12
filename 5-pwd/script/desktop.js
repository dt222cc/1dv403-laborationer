"use strict";

var Desktop = {
    
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
        
        aViewer.onclick = function() {
            if (document.querySelector(".appWindow") === null) {
                new ImageViewer.init();
            }
            
            else {
                document.querySelector(".appWindow").remove();
            }
        };
        
        aViewer.appendChild(imgViewer);
        document.querySelector("#deskFooter").appendChild(aViewer);
    },
};

window.onload = new Desktop.init();