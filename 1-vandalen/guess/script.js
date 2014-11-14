"use strict";

window.onload = function(){
	
	// Slumpar ett tal mellan 1 och 100.
	var secret = Math.floor((Math.random() * 100) + 1);
	var guesses = 1;
	
	var guess = function(number){
		console.log("Det hemliga talet: " + secret); // Du når den yttre variabeln secret innifrån funktionen.
		console.log("Du gissade: " + number); // Detta nummer är det som användaren gissade på.
			
		// Plats för förändring.
		if (isNaN(number)){ // Not a Number.
  			return [false, "Ange ett heltal."];
		}
		else if (number < 1 || number > 100){
			return [false, "Talet är utanför intervallet 1 - 100"];
		}
		else if (+number === secret){ // +:et för Number och === istället för ==.
			return [true, "Grattis du vann! Det hemliga talet var " + secret + " och du behövde " + guesses + " gissningar för att hitta det."];
		}
		else if (number < secret){
			guesses++;
			return [false, "Det hemliga talet är högre!"];
		}
		else {
			guesses++;
			return [false, "Det hemliga talet är lägre!"];
		}
	};
	
	// ------------------------------------------------------------------------------

	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value); // Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
	
};

// Referenser
// toUpperCase	- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase
// toLowerCase	- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
// charAt		- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt