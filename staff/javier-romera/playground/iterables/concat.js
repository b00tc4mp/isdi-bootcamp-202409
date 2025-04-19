var concat = function (...theIterables) { // [object1, object2]
    var newIterable = new Object
    var p = 0
    for (var i = 0; i < theIterables.length; i++) {
        for (var j = 0; j < theIterables[i].length; j++) {
            newIterable[p] = theIterables[i][j]
            p++
        }
        newIterable.length = p
    }
    return newIterable
}

console.log('CASE concat object1 and object2')

var object1 = { 0: 1, 1: 2, 2: 3, length: 3 }
var object2 = { 0: 4, 1: 5, 2: 6, length: 3 }
var object3 = concat(object1, object2)

console.log(object3)
// (6) {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6}