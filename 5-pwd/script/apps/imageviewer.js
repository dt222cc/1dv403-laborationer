"use strict";

var ImageViewer = {
    
    init: function() {
        new Window.createWindow("ImageViewer");
        ImageViewer.getImages();
    },

    getImages: function() {
        console.log("getimages");
    },
};