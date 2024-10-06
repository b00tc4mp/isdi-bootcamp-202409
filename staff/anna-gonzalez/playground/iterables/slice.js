var slice = function (iterable, start, end) {

    var newAnimals = { length: 0 }

    var startValue =
        (start >= iterable.length) ? { length: 0 } :
            (start < -iterable.length || start === undefined) ? 0 :
                (start < 0 && start > -iterable.length) ? start + iterable.length :
                    start

    var endValue =
        (end >= iterable.length || end === undefined) ? iterable.length :
            (end < -iterable.length) ? 0 :
                (-iterable.length <= end && end < 0) ? end + iterable.length :
                    (end < startValue) ? { length: 0 } :
                        end

    for (var i = 0; i < endValue - startValue; i++) {
        newAnimals[i] = iterable[startValue + i]
        newAnimals.length++
    }

    return newAnimals
}

console.log('TEST slice')

console.log('CASE start index')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
var partOfAnimals = slice(animals, 2)
console.log(partOfAnimals)
// ["camel", "duck", "elephant"]

console.log('CASE start and end index')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
var partOfAnimals = slice(animals, 2, 4)
console.log(partOfAnimals)
// ["camel", "duck"]
var partOfAnimals2 = slice(animals, 1, 5)
console.log(partOfAnimals2)
// ["bison", "camel", "duck", "elephant"]

console.log('CASE start negative index')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
var partOfAnimals = slice(animals, -2)
console.log(partOfAnimals)
// ["duck", "elephant"]

console.log('CASE end negative index')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
var partOfAnimals = slice(animals, 2, -1)
console.log(partOfAnimals)
// ["camel", "duck"]