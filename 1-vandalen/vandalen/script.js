"use strict";

    var makePerson = function(persArr){
        
        // Variabler som kan behövas.
        var result = {};
        var names;
    	var ages;
    	var minAge;
        var maxAge;
    	var averageAge;
        
        // Osäker på hur man ska lägga upp koden, testar med denna.
        // Samlar alla namn i en plats.
        names = persArr.map(function(eachpers){return eachpers.name;
            // Sortera namnen.
        }) .sort(function(a,b){return a.localeCompare(b);
            // Sätter ihop dem, istället för ny rad för varje namn.
        }) .join(", ");
            
        // Returnerar resultat.
        result = {minAge: minAge, maxAge: maxAge, averageAge: averageAge, names: names};
        return result;
    };
    
    // För att testa resultatet.
    var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
	var result = makePerson(data);
    console.log(result);
    
    
    // Referenser
    // Sortering - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // Kombinera elementer till en sträng - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
    