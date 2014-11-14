"use strict";

window.onload = function(){

	var birthday = function(date){
			// Tar emot det angivna datumet och returnerar antalet dagar kvar till nästa födelsedag.
			if (Date.parse(date)){
				
				// Variabler för att hantera datum och tid.
				var oneDay = 24 * 60 * 60 * 1000;
				var nextBirthday = new Date(date);
				var today = new Date();
				
				// Sätter tiden till 00:00:00.
				today.setHours(0,0,0);
				
				// Om man fyller år i år.
				nextBirthday.setFullYear(today.getFullYear());

				// Om man "har" fyllt år i år.
				if (today > nextBirthday){
					nextBirthday.setFullYear(today.getFullYear() + 1);
				}
				
				// Räknar ut och returnerar antalet dagar till nästa födelsedag. 
				return Math.floor(Math.abs((nextBirthday.getTime() - today.getTime()) / (oneDay)));
			}
			
			// Om det inmatade datumet är inte i formatet "åååå-mm-dd".
			else {
				throw new Error("FEL! Ange ett korrekt datum enligt formatet \"åååå-mm-dd\".");
			}
			
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
			var answer = birthday(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});

};

// Referenser
// https://developer.mozilla.org/en-US/search?q=date