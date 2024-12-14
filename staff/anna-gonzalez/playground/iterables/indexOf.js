/* var indexOf = function (iterable, element, fromIndex) {
    /* if(!fromIndex) { The exclamation mark says if what's inside if is false fromIndex = 0
    } 
    // If the index is undefined, convert it to 0
    if (fromIndex === undefined) {
        fromIndex = 0
    // Look for the value if the function has a starting index
    } else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }
    // Follow the loop to see what index has the same element
    for (var i = fromIndex; i < iterable.length; i++) {
        if (element === iterable[i]) {
            return i
        }
    }
    return -1
}

var indexOf = function (iterable, element, index) {
    for (let i = index; i < iterable.length; i++) {
        if (element == iterable[i]) {
            return i
        }
    }
}
*/

var indexOfObject = function (iterable, element, fromIndex) {
    // Follow the iterable looking for the element
    // If they are the same, return the index of that element
    // If it doesn't find it, return -1
    // If there's a from Index, starting the search from there
    if (!fromIndex) {
        fromIndex = 0
    }
    else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }

    for (var i = fromIndex; i < iterable["length"]; i++) {
        if (iterable[i] === element) {
            return i
        }
    }

    return -1
}

console.log('CASE locate the index of the value 8')

var numbers = { 0: 2, 1: 4, 2: 8, 3: 16, 4: 32, 5: 8, length: 6 }
var indexExists = indexOfObject(numbers, 8)
var indexDoesntExist = indexOfObject(numbers, 17)

console.log(indexExists)
// 2
console.log(indexDoesntExist)
// - 1

console.log('CASE locate the index of pingu starting from index 1')

var animals = { 0: 'pingu', 1: 'hormiga', 2: 'delfing', 3: 'tejon de la miel', 4: 'pingu', length: 5 }
var indexOfPinguFrom = indexOfObject(animals, 'pingu', 1)

console.log(indexOfPinguFrom)
// 4

console.log('CASE locate the index of Vancouver with fromIndex and without it')

var cities = { 0: 'Barcelona', 1: 'Vancouver', 2: 'Karlsruhe', 3: 'Hospitalet', 4: 'Vancouver', length: 5 }
var indexOfVancouver = indexOfObject(cities, 'Vancouver')
var indexOfVancouverFrom = indexOfObject(cities, 'Vancouver', 2)

console.log(indexOfVancouver)
// 1
console.log(indexOfVancouverFrom)
// 4