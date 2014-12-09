"use strict";

var Quiz = {
    
    questionURL: "http://vhost3.lnu.se:20080/question/1",
    
    // Event listener on a button for the first question.
    init: function(){
        
        var start = document.getElementById("start");
        
        start.addEventListener("click", function(){
            console.log("start.click");
            
            Quiz.getQuestion();
        });
        
        start.addEventListener("keydown", function(key){
            if (key.keyCode === 13){
                console.log("start.enter");
                
                key.preventDefault();
                Quiz.getQuestion();
            }
        });        
    },
    
    // Retrieves and stores question from server
    getQuestion: function(){
        
        console.log("getQuestion start");
        
        var questionArray;
        var question;
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                console.log("if ready");
                
                question = JSON.parse(xhr.responseText);
                questionArray.push(question);
                question.innerHTML = "Fråga " + question.id + " : " + question.question;
                
                console.log(question);
                console.log(question.innerHTML);
            }
            else {
                console.log("Läsfel, status: " + xhr.status);
            }
        };
        
        xhr.open("GET", Quiz.questionURL, true);
        xhr.send(null);
        
        console.log(xhr);
        console.log(question);
        console.log(question.innerHTML);
    },
    
    sendAnswer: function(answerURL){
        
    },
    
};

window.onload = Quiz.init();