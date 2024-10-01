var includes = function (iterable, searchElement, fromIndex) {

    (fromIndex === undefined || fromIndex < -iterable.length) ? fromIndex = 0 :
        (fromIndex < 0 && -iterable.length <= fromIndex) ? fromIndex = fromIndex + iterable.length :
            (fromIndex >= iterable.length) ? false :
                fromIndex

    for (i = 0; i < iterable.length; i++) {
        if (iterable[fromIndex + i] === searchElement) {
            return true
        }
    }

    return false
}

console.log('TEST includes')

console.log('CASE check if includes an element')

var object1 = { 0: 1, 1: 2, 2: 3, length: 3 };
var objectCheck = includes(object1, 2)
console.log(objectCheck);
// true

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 };
var objectCheck = includes(pets, 'cat')
console.log(objectCheck)
// true

console.log('CASE check if does not include an element')

var object1 = { 0: 1, 1: 2, 2: 3, length: 3 };
var objectCheck = includes(object1, 4)
console.log(objectCheck);
// false

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 };
var objectCheck = includes(pets, 'at')
console.log(objectCheck)
// false

console.log('CASE check if includes an element fromIndex')

var object = { 0: 1, 1: 2, 2: 3, length: 3 };
var objectCheck = includes(object, 2, 1)
console.log(objectCheck);
// true

console.log('CASE check if includes a negative fromIndex')

var object = { 0: 1, 1: 2, 2: 3, length: 3 };
var objectCheck = includes(object, 2, -2)
console.log(objectCheck);
// true

var object = { 0: 1, 1: 2, 2: 3, length: 3 };
var objectCheck = includes(object, 2, -1)
console.log(objectCheck);
// false