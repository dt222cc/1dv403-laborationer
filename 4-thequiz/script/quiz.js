"use strict";

var Quiz = {
    
    questionURL : "http://vhost3.lnu.se:20080/question/1",
    quizBoard   : document.getElementById("quizBoard"),
    
    init: function() {
        
        var startButton = document.getElementById("start");
        
        // Event listener on a button for the first question.
        startButton.addEventListener("click", function() {
            Quiz.getQuestion();
            startButton.classList.toggle("visible");
        });
        
        startButton.addEventListener("keydown", function(e) {
            if (e.eCode === 13) {
                e.preventDefault();
                Quiz.getQuestion();
                startButton.classList.toggle("visible");
            }
        });
    },
    
    // Retrieves and stores question from server
    getQuestion: function() {
        
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var question = JSON.parse(xhr.responseText);
                    
                    question.innerHTML = "Fråga " + question.id + " : " + question.question;
                    
                    // Continue here
                    Quiz.renderBoard(question);
                }
                else {
                    console.log("Läsfel, status: " + xhr.status);
                }
            }
        },
        
        xhr.open("GET", Quiz.questionURL, true);
        xhr.send(null);
    },
    
    
    // Create a text area and a submit button with event listener
    renderBoard: function(question) {

        // First: render question
        var questions = document.createElement("div");
        var questionParagraph = document.createElement("p");
        
        questions.id = "questions";
        questionParagraph.className = "question";
        questionParagraph.innerHTML = question.innerHTML;
        
        questions.appendChild(questionParagraph);
        Quiz.quizBoard.appendChild(questions);
        
        // Second: the textArea
        var textArea = document.createElement("textarea");
        
        textArea.setAttribute("rows", "3");
        textArea.setAttribute("placeholder", "Skriv ditt svar här...");
        
        textArea.addEventListener("keydown", function(e) {
            if (e.keyCode === 13 && e.shiftKey === false) {
                e.preventDefault();
                Quiz.sendAnswer(question);
            }
        });
        
        Quiz.quizBoard.appendChild(textArea);
        
        // Third: the submitButton
        var submitButton = document.createElement("input");
        
        submitButton.setAttribute("type", "button");
        submitButton.setAttribute("value", "Skicka svar");
        submitButton.className = "sendAnswer";
        
        submitButton.addEventListener("click", function() {
                Quiz.sendAnswer(question);
        });
        
        submitButton.addEventListener("keydown", function(e) {
            if (e.eCode === 13) {
                e.preventDefault();
                Quiz.sendAnswer(question);
            }
        });
        
        Quiz.quizBoard.appendChild(submitButton);
    },
    
    sendAnswer: function(question){
        console.log("BAAAM!!");
        console.log(question.nextURL);
    },
    
};

window.onload = Quiz.init();