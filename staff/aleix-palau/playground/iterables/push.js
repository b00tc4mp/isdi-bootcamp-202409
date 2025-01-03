var push = function (iterable, element) {
    if (arguments.length === 2) {
        iterable[iterable.length] = element
        iterable.length++
    } else {
        for (var i = 1; i < arguments.length; i++) {
            iterable[iterable.length] = arguments[i]
            iterable.length++
        }
    }

    return iterable.length
}

// console.log('TEST push')

// console.log('CASE add "cows" to the end of array')

// var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', length: 3 }
// var length = push(animals, 'cows')

// console.log(animals)
// // { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 4 }
// console.log(length)
// // 4


console.log('CASE add "chickens", "cats", and "dogs" to the end of array')

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', length: 3 }
var length = push(animals, 'chickens', 'cats', 'dogs')

console.log(animals)
// { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'chickens', 4: 'cats', 5: 'dogs', length: 6 }
console.log(length)
// 6