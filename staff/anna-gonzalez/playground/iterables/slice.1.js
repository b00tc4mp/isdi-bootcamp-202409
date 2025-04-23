var slice = function (iterable, start) {
    // create new object
    var newAnimals = { length: 0 }
    // go through array
    for (var i = 0; i < iterable.length - start; i++) {
        // copy starting from start
        newAnimals[i] = iterable[start + i]
        // create the length of the new object
        newAnimals.length++
    }
    // return new object
    return newAnimals
}

console.log('TEST slice')

console.log('CASE portion of an object starting from index 2')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
var partOfAnimals = slice(animals, 2)
console.log(partOfAnimals)
// ["camel", "duck", "elephant"]