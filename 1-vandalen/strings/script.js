"use strict";

window.onload = function(){

	var convertString = function(str){
		var newStr = "";
		
		// Vid fel, kasta ett undantag med ett meddelande till användaren.
		if (str === ""){
			throw new Error("Fältet är tomt! Skriv in en text.");
		}
		
		/* 	
		 * För varje tecken i strängen.
		 * Eller (var i = 0; i < str.length; i++)
		 */
		for (var char in str){
	  		// Om tecknen är "A" eller "a" omvandlas den till "#".
		  	if (str.charAt(char) === "A" || str.charAt(char) === "a"){
	    		newStr += "#";
	    	}
	    	// Om tecknen är UpperCase omvandlas den till LowerCase.
	    	else if (str.charAt(char) === str.charAt(char).toUpperCase()){
	            newStr += str.charAt(char).toLowerCase();
	        }
        	// Annars (då den är LowerCase) omvandlas den till UpperCase.
	        else {
	        	newStr += str.charAt(char).toUpperCase();
	        }
    	}
    	// Returnera den konverterade strängen.
    	return newStr;
	};
	
	// ------------------------------------------------------------------------------

	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});
};

// Referenser
// toUpperCase	- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase
// toLowerCase	- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
// charAt		- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt