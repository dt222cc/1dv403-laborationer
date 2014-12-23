"use strict";

var ImageViewer = {
    
    imgURL: "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/",
    imgArr: [],
    thumbHeight: 0,
    thumbWidth: 0,
    
    init: function() {
        new Window.createWindow("ImageViewer");
        ImageViewer.getImages();
    },

    getImages: function() {
        
        var xhr = new XMLHttpRequest();
      
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    ImageViewer.imageArr = JSON.parse(xhr.responseText);
                    
                    for (var i = 0; i < ImageViewer.imageArr.length; i++) {
                        if (ImageViewer.imageArr[i].thumbWidth > ImageViewer.thumbWidth) {
                            ImageViewer.thumbWidth = ImageViewer.imageArr[i].thumbWidth;
                        }
                        
                        if (ImageViewer.imageArr[i].thumbHeight > ImageViewer.thumbHeight) {
                            ImageViewer.thumbHeight = ImageViewer.imageArr[i].thumbHeight;
                        }
                    }
                    
                    ImageViewer.renderImages();
                    
                    document.querySelector(".loading").remove();
                }
                
                else {
                    console.log("Läsfel, status:" + xhr.status);
                }
            }
        };
        
        xhr.open("GET", ImageViewer.imgURL, true);
        xhr.send(null);
    },
    
    renderImages: function() {
        
      ImageViewer.imageArr.forEach(function(currentImage) {
         var image = document.createElement("img");
         image.src = currentImage.thumbURL;
         
         var imgContainer = document.createElement("a");
         imgContainer.classList.add("imgContainer");
         imgContainer.href = "#";
         imgContainer.style.width = ImageViewer.thumbWidth + "px";
         imgContainer.style.height = ImageViewer.thumbHeight + "px";
         
         imgContainer.onclick = function() {
             document.querySelector("#content").style.background = "url(" + currentImage.URL + ")";
         };
         
         imgContainer.appendChild(image);

         var appContainer = document.querySelector(".imageviewer");
         appContainer.appendChild(imgContainer);
      });
    },
};