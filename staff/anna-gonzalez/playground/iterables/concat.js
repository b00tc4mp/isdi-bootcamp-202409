var concat = function (iterable, iterable2) {
    // create a new variable object
    var result = { length: 0 }
    // go through the first object and assign it to the newobj
    for (var i = 0; i < iterable.length; i++) {
        result = iterable[i]
        iterable.length++
    }
    // go through the second object and assig it too
    for (var i = 0; i < iterable2.length; i++) {
        result = iterable2[i]
        iterable2.length++
    }
    // return a new object
    return result
}

console.log('TEST concat')

console.log('CASE concat two objects')

var object1 = { 0: 1, 1: 2, 2: 3, length: 3 }
var object2 = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var newObject = concat(object1, object2)

console.log(newObject)
// { 0: 1, 1: 2, 2: 3, 3: 'a', 4: 'b', 5: 'c', length: 6 }

console.log('CASE concat three objects')

var object1 = { 0: 1, 1: 2, 2: 3, length: 3 }
var object2 = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var object3 = { 0: 'fish', 1: 'almond', 2: 'nut', length: 3 }
var newObject = concat(object1, object2, object3)

console.log(newObject)
// { 0: 1, 1: 2, 2: 3, 3: 'a', 4: 'b', 5: 'c', 6: 'fish', 7: 'almond', 8: 'nut', length: 9 }