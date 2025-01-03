var lastIndexOf = function (iterable, element, fromIndex) {
    /*
    iterate backwards on iterable
    if element found then return index
    otherwise return -1
    */

    /*
    iterate on iterable from fromIndex index
    if element found then return index
    otherwise return -1
    */

    if (fromIndex === undefined) {
        for (var i = iterable.length - 1; i >= 0; i--) {
            if (iterable[i] === element) {

                return i
            }
        }

        // return -1
    } else if (fromIndex < 0) {
        for (i = iterable.length + fromIndex; i >= 0; i--) {
            if (iterable[i] === element) {

                return i
            }
        }
    } else {
        for (i = fromIndex; i >= 0; i--) {
            if (iterable[i] === element) {

                return i
            }
        }
    }
}

// console.log('TEST: lastIndexOf')

// console.log('CASE: Find the last index of the element Dodo')

// const animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', length: 4 }
// var animal = lastIndexOf(animals, 'Dodo')
// console.log(animal)
// // 3

console.log('CASE: Find the last index of the element 2 starting at -2')

var numbers = { 0: 2, 1: 5, 2: 9, 3: 2, length: 4 }
var number = lastIndexOf(numbers, 2, -22)
console.log(number)
// 0
// mirar per casos grans, haurai de tornar -1