var lastindexOf = function (iterable, element) {


    for (var i = iterable.length - 1; i >= 0; i--) {

        if (iterable[i] === element) {
            return i;
        }
    }
    return -1
}


console.log('TEST Array.prototype.lastindexOf')

console.log('Buscar con una properidad que indice tiene desde el final del arrays')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4 };
// arrays con la variable animals
var animal = lastindexOf(animals, "Tiger")

console.log(animal)
//4