var concat = function (iterables) {
    /*
    Recorrer cada propiedad de los objetos y "copiarla" en el objeto resultante.
    */
    var length = 0;
    var newObj = {}
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            newObj[length] = arguments[i][j];
            length++
        }
    }
    newObj.length = length
    return newObj
}

console.log("TEST concat")

console.log("CASE concat two objects")

var firstObj = { 0: "a", 1: "b", 2: "c", length: 3 }
var secondObj = { 0: "d", 1: "e", 2: "f", length: 3 }

var concatObj = concat(firstObj, secondObj);
console.log(concatObj)
// { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", length: 6 }

console.log("CASE concat three objects")

var firstObj = { 0: "a", 1: "b", 2: "c", length: 3 }
var secondObj = { 0: "d", 1: "e", 2: "f", length: 3 }
var thirdObj = { 0: 1, 1: 2, length: 2 }

var concatObj = concat(firstObj, secondObj, thirdObj)
console.log(concatObj)
// { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: 1, 7: 2, length: 8 }
