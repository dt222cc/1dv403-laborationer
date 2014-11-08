"use strict";

    var makePerson = function(persArr){
        
        // Osäker på hur man ska lägga upp koden, testar med denna.
        // Samlar alla namn i en plats.
        var names = persArr.map(function(eachpers){return eachpers.name;
            // Sortera namnen.
        }) .sort(function(a,b){return a.localeCompare(b);
        }) .join(", "); // Sätter ihop egenskaperna till en objekt.
        
        // Samlar alla ålder i en plats.
        var ages = persArr.map(function(eachage){return eachage.age;});
        
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
    // Sortering - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // Kombinera elementer till en sträng - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
    // maxAge - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
    // minAge - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
    // averageAge   - http://stackoverflow.com/questions/10359907/array-sum-and-average
    //        och   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    