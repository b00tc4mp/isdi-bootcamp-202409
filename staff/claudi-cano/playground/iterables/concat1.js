var concat = function (iterables) {
    var newObj = new Object
    var p = 0; // para asignar las propiedades del nuevo objeto
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            newObj[p] = arguments[i][j]
            p++
        }
    }
    newObj.length = p
    return newObj
}

console.log("TEST concat")

var object1 = { 0: 1, 1: 2, 2: 3, length: 3 }
var object2 = { 0: 4, 1: 5, 2: 6, length: 3 }
var object3 = concat(object1, object2)

console.log(object3)
