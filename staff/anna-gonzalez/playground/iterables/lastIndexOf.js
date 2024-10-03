var lastIndexOf = function (iterable, searchElement, fromIndex) {
    // update fromIndex if it is out of range and it is a negative fromIndex
    if (-iterable.length <= fromIndex && fromIndex < 0) {
        fromIndex += iterable.length
    }
    // update fromIndex if it is out of the negative range
    else if (fromIndex < -iterable.length) {
        return -1
    }
    // create a fromIndex if it is bigger than the iterableLength or if there is no fromIndex
    else if (fromIndex >= iterable.length || arguments.length === 2) {
        fromIndex = iterable.length - 1
    }

    /* ternario
    var fromIndex = (
        (-iterable.length <= fromIndex && fromIndex < 0)
            ? fromIndex + iterable.length
            : (fromIndex < -iterable.length)
                ? -1
                : (fromIndex >= iterable.length || arguments.length === 2)
                    ? iterable.length - 1
                    : fromIndex
    )
    */

    // go through iterable backwards
    for (var i = fromIndex; i >= 0; i--) {
        // return index if searchElement equals iterable[i]
        if (iterable[i] == searchElement) {
            return i
        }
    }
    //return -1 if searchElement not found
    return -1
}

console.log('TEST lastIndexOf')

console.log('CASE locate lastIndexOf dodo')

var animals = { 0: 'dodo', 1: 'tiger', 2: 'penguin', 3: 'dodo', length: 4 }
var lastIndex = lastIndexOf(animals, 'dodo')

console.log(lastIndex)
// 3

console.log('CASE locate lastIndexOf tiger')

var animals = { 0: 'dodo', 1: 'tiger', 2: 'penguin', 3: 'dodo', length: 4 }
var lastIndex = lastIndexOf(animals, 'tiger')

console.log(lastIndex)
// 1

console.log('CASE locate lastIndexOf penguin startFrom 1')

var animals = { 0: 'dodo', 1: 'tiger', 2: 'penguin', 3: 'dodo', length: 4 }
var lastIndex = lastIndexOf(animals, 'penguin', 1)

console.log(lastIndex)
// -1

console.log('CASE locate lastIndexOf penguin startFrom -1')

var animals = { 0: 'dodo', 1: 'tiger', 2: 'penguin', 3: 'dodo', length: 4 }
var lastIndex = lastIndexOf(animals, 'penguin', -1)

console.log(lastIndex)
// 2

console.log('CASE locate lastIndexOf penguin startFrom -50')

var animals = { 0: 'dodo', 1: 'tiger', 2: 'penguin', 3: 'dodo', length: 4 }
var lastIndex = lastIndexOf(animals, 'penguin', -50)

console.log(lastIndex)
// -1

console.log('CASE locate lastIndexOf penguin startFrom 50')

var animals = { 0: 'dodo', 1: 'tiger', 2: 'penguin', 3: 'dodo', length: 4 }
var lastIndex = lastIndexOf(animals, 'penguin', 50)

console.log(lastIndex)
// 2

console.log('CASE locate lastIndexOf raccoon')

var animals = { 0: 'dodo', 1: 'tiger', 2: 'penguin', 3: 'dodo', length: 4 }
var lastIndex = lastIndexOf(animals, 'raccoon')

console.log(lastIndex)
// -1