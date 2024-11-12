var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', length: 3 };

console.log(animals);
// Expected output: 3


var push = function (iterable, newElement) {
    animals[iterable.length] = newElement;
    animals.length++;
}

var count = push(animals, 'Elephants');


console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "Elephants"]
// Expected output: 4


//animals.push('chickens', 'cats', 'dogs');
//console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
