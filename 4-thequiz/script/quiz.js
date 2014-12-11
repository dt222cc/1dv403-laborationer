"use strict";

var Quiz = {
    
    questionURL: "http://vhost3.lnu.se:20080/question/1",
    
    startButton         : document.getElementById("start"),
    quizBoard           : document.getElementById("quizBoard"),
    textArea            : document.getElementById("value"),
    submitButton        : document.getElementById("send"),
    questionParagraph   : document.getElementById("questionP"),
    wrongAnswer         : document.getElementById("wrongAnswer"),
    
    questionObject: {}, answerObject: {},
    questionsArray: [], triesPerQuestion: [],
    
    questionID: 0, tries: 0, totalTries: 0, result: "",
    
    // The quiz starts with a single button, here I add eventlistener to that button.
    init: function() {
        
        Quiz.startButton.addEventListener("click", function() {
            Quiz.start();
        });
        
        Quiz.startButton.addEventListener("keydown", function(e) {
            if (e.eCode === 13) {
                e.preventDefault();
                Quiz.start();
            }
        });
    },
    
    /*
     * Here I remove the start button while the hidden quizboard now become visible.
     * From here I add eventlistener on textarea and submitbutton for the sending answer part.
     * Then the question from URL gets stored with function getQuestion() 
     */
    start: function() {
        
        document.getElementById("QUIZ").removeChild(document.getElementById("center"));
        Quiz.quizBoard.classList.toggle("visible");

        Quiz.textArea.addEventListener("keydown", function(e) {
            if (e.keyCode === 13 && e.shiftKey === false) {
                e.preventDefault();
                Quiz.sendAnswer();
            }
        });
        
        Quiz.submitButton.addEventListener("click", function() {
            Quiz.sendAnswer();
        });
        
        Quiz.submitButton.addEventListener("keydown", function(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                Quiz.sendAnswer();
            }
        });
        
        Quiz.getQuestion();
    },
    
    /* 
     * Retrieves and stores next question from URL.
     * Renders the paragraph for question.
     * Stores question in an array for all questions for later use.
     */
    getQuestion: function() {
        
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    Quiz.questionObject = JSON.parse(xhr.responseText);
                    
                    Quiz.questionID++;
                    Quiz.questionParagraph.innerHTML = "Fråga " + Quiz.questionID + ": " + Quiz.questionObject.question;
                    Quiz.questionsArray.push(Quiz.questionParagraph.innerHTML);
                }
                
                else {
                    console.log("Läsfel, status: " + xhr.status);
                }
            }
        },
        
        xhr.open("GET", Quiz.questionURL, true);
        xhr.send(null);
    },
    
    /* 
     * Handles counters. Checks the nextURL. End the quiz if there's no more questions.
     * Retrieves and stores the answer from URL.
     * Checks the value from textarea with the answer from answerURL.
     */
    sendAnswer: function(){
        
        // Quiz.tries++;
        
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    Quiz.answerObject = JSON.parse(xhr.responseText);
                    
                    if (Quiz.answerObject.message === "Correct answer!") {
                        Quiz.questionURL = Quiz.answerObject.nextURL;
                        
                        Quiz.triesPerQuestion.push(Quiz.tries);
                        Quiz.tries = 0;
                        
                        Quiz.wrongAnswer.className = "visible"; // Hide wrongAnswer paragraph on correct answer.
                        Quiz.getQuestion();
                    }
                    
                    if (!Quiz.answerObject.hasOwnProperty("nextURL")) {
                        Quiz.ending();
                    }
                }
                
                else if (xhr.status == 400) {
                    Quiz.wrongAnswer.classList.remove("visible");
                    Quiz.tries++;
                }
                
                else {
                    console.log("Läsfel, status: " + xhr.status);
                }
            }
        };
        
        var sendValue = JSON.stringify({"answer": Quiz.textArea.value});
        
        xhr.open("POST", Quiz.questionObject.nextURL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(sendValue);            // TODO - Bugfix? POST http://vhost3.lnu.se:20080/answer/1 400 (Bad Request)
    
        Quiz.textArea.value = "";
    },
    
    ending: function() {
        
        Quiz.questionParagraph.innerHTML = "Du har svarat på alla frågor! Antal fel svar för varje fråga är: <br />"; 

        for (var i = 0; i < Quiz.questionID; i++) {
            Quiz.result += Quiz.questionsArray[i] + " = " + Quiz.triesPerQuestion[i] + " fel svar. <br />";
            Quiz.totalTries += Quiz.triesPerQuestion[i];
        }
        
        Quiz.questionParagraph.innerHTML += "<br />" + Quiz.result + "<br />Du gjorde totalt " + Quiz.totalTries + " fel gissningar.";
        
        Quiz.quizBoard.removeChild(Quiz.textArea);
        Quiz.quizBoard.removeChild(Quiz.submitButton);
    }
};

window.onload = Quiz.init();