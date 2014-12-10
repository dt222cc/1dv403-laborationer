"use strict";

var Quiz = {
    
    questionURL         : "http://vhost3.lnu.se:20080/question/1",
    
    startButton         : document.getElementById("start"),
    quizBoard           : document.getElementById("quizBoard"),
    textArea            : document.getElementById("value"),
    submitButton        : document.getElementById("send"),
    questionParagraph   : document.getElementById("questionP"),
    
    questionObject      : {},
    answerObject        : {},
    
    questionID          : 1,
    
    
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
     * Here I toggle the start button to be hidden while the hidden quizboard now become visible.
     * From here I get the question from URL with function getQuestion() and then I add eventlistener on textarea and submitbutton for the next part
     * which is sending an answer and checking if its correct or not.
     */
    start: function() {
        Quiz.startButton.classList.toggle("visible");
        Quiz.quizBoard.classList.toggle("visible");
        
        Quiz.getQuestion(); // Get question
        
        // Sending answer with enter or submitbutton
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
    },
    
    // Retrieves and stores question from server
    getQuestion: function() {
        
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    Quiz.questionObject = JSON.parse(xhr.responseText);
                    
                    Quiz.questionParagraph.innerHTML = "Fråga " + Quiz.questionID + " : " + Quiz.questionObject.question; // Format for the paragraph
                    
                    console.log(Quiz.questionParagraph.innerHTML); // Temp
                }
                else {
                    console.log("Läsfel, status: " + xhr.status);
                }
            }
        },
        
        xhr.open("GET", Quiz.questionURL, true);
        xhr.send(null);
    },
    
    sendAnswer: function(){
        
        console.log("sending answer: " + Quiz.textArea.value); // Temp
        
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    
                    Quiz.answerObject = JSON.parse(xhr.responseText);
                    
                    // If correct answer, get the next answerURL
                    if (Quiz.answerObject.message === "Correct answer!") {
                        Quiz.questionURL = Quiz.answerObject.nextURL; // Stores the nextURL
                        Quiz.questionID++; // QuestionID increases by '1' for the next question
                        Quiz.getQuestion();
                    }
                    else {
                        // Wrong answer, here?
                    }
                }
                else {
                    console.log("Läsfel, status: " + xhr.status);
                }
            }
        };
        
        var value = JSON.stringify({"answer": Quiz.textArea.value});
        xhr.open("POST", Quiz.questionObject.nextURL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(value);
        
        Quiz.textArea.value = "";
    },
    
};

window.onload = Quiz.init();



// TODO -   * when there's no more questions.
//          * when u type in the wrong answer = red background with text somewhere? (add paragraph? toggle paragraph? and then remove it when answer is correct?)
//          * a counter for numbers of tries for each question (variable for the counter and one for an array containing the counters?)
//          * question 5: Vad ä 14-2   =    Typo? or intended,  fix with "regex/reguljära uttryck?" (need to research)