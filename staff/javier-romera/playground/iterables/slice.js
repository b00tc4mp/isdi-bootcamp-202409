var slice = function (iterable, startIndex, endIndex) {
    if (arguments.length <= 1) { return iterable }

    var newObj = {}

    if (startIndex < 0) {
        startIndex = iterable.length + startIndex
    }
    else if (startIndex >= iterable.length) {
        return newObj
    }

    if (endIndex < -iterable.length) {
        endIndex = iterable.length
    }
    else if (endIndex < 0) {
        endIndex = iterable.length + endIndex
    }

    if (endIndex <= startIndex) {
        return newObj
    }

    newObj.length = 0;
    for (var i = (!startIndex ? 0 : startIndex);
        i < (!endIndex ? iterable.length : endIndex);
        i++) {
        newObj[newObj.length] = iterable[i]
        newObj.length++
    }
    return newObj
}

console.log('TEST slice')

console.log('CASE slice animals with a start index')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }
var slicedAnimals1 = slice(animals, 2)

console.log(slicedAnimals1)
// {0: 'camel', 1: 'duck', 2: 'elephant', length: 3}

console.log('CASE slice animals with a start and end index')

var slicedAnimals2 = slice(animals, 1, 4)

console.log(slicedAnimals2)
// {0: 'bison', 1: 'camel', 2: 'duck', length: 3}

console.log('CASE slice animals with negative indexes')

var slicedAnimals3 = slice(animals, 3, -1)
var slicedAnimals4 = slice(animals, -4, 3)
var slicedAnimals5 = slice(animals, -5, -1)

console.log(slicedAnimals3)
// {0: 'duck', length: 1}
console.log(slicedAnimals4)
// {0: 'bison', 1: 'camel', length: 2}
console.log(slicedAnimals5)
// {0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', length: 4}

console.log('CASE no index inputs')

var slicedAnimals6 = slice(animals)

console.log(slicedAnimals6)
// {0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5}

console.log('CASE start index >= array.length')

var slicedAnimals7 = slice(animals, 10)

console.log(slicedAnimals7)
// {}

console.log('CASE end index < -array.length')

var slicedAnimals8 = slice(animals, undefined, -10)

console.log(slicedAnimals8)
// {0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5}
//READ MDN => "If end < -array.length, 0 is used"

console.log('CASE end index >= start index')

var slicedAnimals9 = slice(animals, 3, 3)

console.log(slicedAnimals9)
// {}
