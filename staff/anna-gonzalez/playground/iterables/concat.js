var concat = function (iterable) {
    var newObj = { length: 0 }
    for (var j = 0; j < arguments.length; j++) {
        for (var i = 0; i < arguments[j].length; i++) {
            newObj[newObj.length] = arguments[j][i]
            newObj.length++
        }
    }
    return newObj
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

console.log('CASE concat values')
//not working yet
var object1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var newObject = concat(object1, 1, 2)

console.log(newObject)
// { 0: 'a', 1: 'b', 2: 'c', 3: 1, 4: 2, length: 5 }