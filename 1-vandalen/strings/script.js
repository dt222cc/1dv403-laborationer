"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		var newStr = "";
		
		// Vid fel, kasta ett undantag med ett meddelande till användaren.
		if (str === ""){
			throw new Error("Fältet är tomt! Skriv in en text.");
		}
		
		// För varje tecken i strängen.
		for (var char in str){
    	
		  	if (str.charAt(char) === "A" || str.charAt(char) === "a"){
		  		// Alla "A" och "a" omvandlas till "#".
	    		newStr += "#";
	    	}
	    	else if (str.charAt(char) === str.charAt(char).toUpperCase()){
	        	// Om tecken är UpperCase omvandlas den till LowerCase.
	            newStr += str.charAt(char).toLowerCase();
	        }
	        else {
	        	// Annars (då den är LowerCase) omvandlas till UpperCase.
	        	newStr += str.charAt(char).toUpperCase();
	        }
    	}
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