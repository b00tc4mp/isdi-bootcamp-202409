var push = function (iterable, newElement) {
    if (arguments.length === 2) {
        iterable[iterable.length] = newElement;
        iterable.length++;
    } else {
        for (var i = 1; i < arguments.length; i++) {
            var newElement = arguments[i];
            iterable[iterable.length] = newElement;
            iterable.length++;
        }
    }

}

//Para el siguiente ejemplo añadimos un unico elemento al array
console.log("Este es el array original de animales");
var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', length: 3 };
console.log(animals);
// Expected output: 3

console.log("En este punto añadimos un solo animal nuevo (Elephants)");
var count = push(animals, 'Elephants');
console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "Elephants"]
// Expected output: 4



//Ahora lo que vamos a hacer será añadir varios animales al array
console.log("En este ejemplo vamos a añadir varios animales al array");
console.log("El array original es: ");
var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', length: 3 };
console.log(animals);
// Expected output: 3


console.log("Y en este punto es cuando añadimos chickens, cats, gogs and turtles");
var count = push(animals, 'chickens', 'cats', 'dogs', 'turtles');
console.log(animals);
//animals.push('chickens', 'cats', 'dogs');
//console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
