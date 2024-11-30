var includes = function (iterable, searchElement, fromIndex) {
    if (fromIndex < -iterable.length || fromIndex >= iterable.length) {
        return false
    }

    if (!fromIndex) {
        fromIndex = 0;
    }
    else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }
    for (fromIndex; fromIndex < iterable.length; fromIndex++) {
        if (iterable[fromIndex] === searchElement) {
            return true
        }
    }
    return false
}

console.log('TEST includes')

console.log('CASE numbers includes 2')

var numbers = { 0: 1, 1: 2, 2: 3, length: 3 }
var numbersIncludes = includes(numbers, 2)

console.log(numbers)
// {0: 1, 1: 2, 2: 3, length: 3}
console.log(numbersIncludes)
// true

console.log('CASE animals includes cat')

var animals = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 }
var animalsIncludes1 = includes(animals, 'cat')

console.log(animals)
// (3) ['cat', 'dog', 'bat']
console.log(animalsIncludes1)
// true

console.log('CASE animals includes unicorn')

var animalsIncludes2 = includes(animals, 'unicorn')

console.log(animals)
// {0: 'cat', 1: 'dog', 2: 'bat', length: 3}
console.log(animalsIncludes2)
// false