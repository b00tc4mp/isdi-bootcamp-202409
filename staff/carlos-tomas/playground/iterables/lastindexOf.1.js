var lastindexOf = function (iterable, element, fromIndex) {
    if (!fromIndex) {
        fromIndex = iterable.length - 1
    }
    else if (fromIndex < 0) {
        fromIndex = fromIndex + (iterable.length)
    }

    for (var i = fromIndex; i >= 0; i--) {

        if (iterable[i] === element) {
            return i;
        }
    }
    return -1
}


console.log('TEST Array.prototype.lastindexOf')

console.log('Buscar con una properidad que indice tiene desde el final del arrays')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Beer', length: 4 };
// arrays con la variable animals
var animal = lastindexOf(animals, "Beer", -3)

console.log(animal)
//4