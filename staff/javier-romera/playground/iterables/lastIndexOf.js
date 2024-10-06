var lastIndexOf = function (iterable, element, index) {
    if (!index) {
        index = iterable.length - 1
    }

    if (index < -iterable.length || index >= iterable.length) {
        return -1
    }
    if (index < 0) { index = iterable.length + index }
    for (index; iterable.length - index; index--) {
        if (iterable[index] == element) {
            return index
        }
    }
}

console.log('CASE identify last position of Dodo')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4 }
animalA = lastIndexOf(animals, 'Dodo')
animalB = lastIndexOf(animals, 'Tiger')

console.log(animals)
// (4) { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4 }
console.log(animalA)
// 3
console.log(animalB)
// 1