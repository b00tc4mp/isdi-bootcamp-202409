var lastindexOf = function (iterable, element, fromIndex) {
    var index = [fromIndex = undefined ? iterable.length - 1 : fromIndex < 0 ? fromIndex = fromIndex + (iterable.length) : iterable.length]
    for (var i = index; i >= 0; i--) {
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
var animal = lastindexOf(animals, "Tiger", 0)

console.log(animal)
//4