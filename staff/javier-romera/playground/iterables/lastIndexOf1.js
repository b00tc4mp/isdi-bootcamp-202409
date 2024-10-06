var lastIndexOf = function (iterable, element, index) {

    for (var i = (arguments.length === 2 || index >= iterable.length ? iterable.length - 1 :
        -iterable.length <= index && index < 0 ? index + iterable.length :
            index);
        i >= 0;
        i--) {
        if (iterable[i] === element) {
            return i
        }
    }
    return - 1
}

console.log('TEST lastIndexOf')

console.log('CASE identify last position of Dodo')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4 }
var animalA = lastIndexOf(animals, 'Dodo')

console.log(animals)
// { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4 }
console.log(animalA)
// 3

console.log('CASE identify last position of Dodo with an index of 2')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4 }
var animalB = lastIndexOf(animals, 'Dodo', 2)

console.log(animals)
// { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4 }
console.log(animalB)
// 0

console.log('CASE identify last position of table')

var decorations = { 0: 'closet', 1: 'chair', 2: 'table', 3: 'lamp', 4: 'table', length: 5 }
var decor = lastIndexOf(decorations, 'table', -1)

console.log(decorations)
// { 0: 'closet', 1: 'chair', 2: 'table', 3: 'lamp', 4: 'table', length: 5 }
console.log(decor)
// 4