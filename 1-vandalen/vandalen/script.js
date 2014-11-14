"use strict";

    var makePerson = function(persArr){
        
        // Samlar alla namn på en plats.
        var names = persArr.map(function(eachpers){
            // Felinmatning.
            if (typeof eachpers.name !== "string"){
			    throw "Data type error";
		    }
		    return eachpers.name;
        }) .sort(function(a,b){return a.localeCompare(b); // Sortering av namn.
        }) .join(", "); // Sätter ihop egenskaperna till en objekt.
        
        // Samlar alla ålder på en plats.
        var ages = persArr.map(function(eachage){
            if (typeof eachage.age !== "undefined"){
    			if (typeof eachage.age !== "number"){
    				throw "Data type error";
    			}
		    }
            return eachage.age;
        });
        
        var maxAge = Math.max.apply(Math, ages); // Väljer ut det högsta åldern.
       
        var minAge = Math.min.apply(Math, ages); // Väljer ut det minsta åldern.
        
        // Kalkylerar medelåldern.
        var sum = ages.reduce(function(a, b){return a + b});
        var averageAge = Math.round(sum / ages.length); 
        
        // Returnerar resultat.
        var result = {minAge: minAge, maxAge: maxAge, averageAge: averageAge, names: names};
        return result;
    };
    
    // För att testa resultatet.
    var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
    var result = makePerson(data);
    console.log(result);
    
    // Referenser
    // Sortering    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // Kombinera elementer till en sträng - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
    // maxAge       - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
    // minAge       - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
    // averageAge   - http://stackoverflow.com/questions/10359907/array-sum-and-average
    //              - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // Felhantering - http://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
    //              - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof