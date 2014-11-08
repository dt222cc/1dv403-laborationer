"use strict";

    var makePerson = function(persArr){
        
        // Variabler som kan behövas.
        var result = {};
        var names;
    	var ages;
    	var minAge;
        var maxAge;
    	var averageAge;
        
        // Samlar alla namn i en plats.
        names = persArr.map(function (eachpers){return eachpers.name;})
            // Sortera namnen - TODO: Ä, Å, Ö till Å, Ä, Ö.
            .sort()
            // Sätter ihop dem, istället för ny rad för varje namn.
            .join(", ");
            
        // Returnerar resultat.
        result = {minAge: minAge, maxAge: maxAge, averageAge: averageAge, names: names};
        return result;
    };
    
    // För att testa resultatet.
    var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
	var result = makePerson(data);
    console.log(result);