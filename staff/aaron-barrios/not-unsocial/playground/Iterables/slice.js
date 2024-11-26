function slice(iterable, startIndex, endIndex) {
    /*
       - Definir el iterable
       - creas una copia del iterable (No es el mismo)
       - asignas un indice Start (desde donde empiezas a contar(NO TE CORTA A TI MISMO))
       - asignas un indice End (hasta donde quieres cortar(TE CORTA A TI MISMO ))
        */
    var result = { length: 0 }

    // CASE CON UN STARTINDEX 
    if (!endIndex) {
        for (var i = startIndex; i < iterable.length; i++) {
            var element = iterable[i]

            result[result.length] = element
            result.length++
        }
    }
    else {
        for (var i = startIndex; i < endIndex; i++) {
            var element = iterable[i]

            result[result.length] = element
            result.length++
        }
    }

    return result
}
console.log('TEST SLICE')


console.log('CASE slice nums since index 2')
var nums = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6 };

var case1 = slice(nums, 2)
console.log(case1)
//EXPECTED OUTPUT
// var nums = { 0: 3, 1: 4, 2: 5, 3: 6, length: 4 };

console.log('CASE slice nums since index 2 until index4')
var nums2 = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6 };

var case2 = slice(nums2, 2, 4)
console.log(case2)
//EXPECTED OUTPUT
// var nums = { 0: 3, 1: 4, length: 2 };

