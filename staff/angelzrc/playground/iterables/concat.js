var concat = function () {
    //add the properties and values of one object to another.
    // in this case the properties are interger (indexes) and one final length
    // for one 1 argument, add length of iterable properties of argument and add length of argument to length of iterable
    var result= {length:0}
    for (var j = 0; j < arguments.length; j++) {
        for (i = 0; i < arguments[j].length; i++) {
            result[result.length + i] = arguments[j][i]
        }
        result.length += arguments[j].length

    }
    return result
}


console.log('CASE merge one iterable to another using concat')
var array1 = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
var array2 = { 0: 'd', 1: 'e', 2: 'f', 3: 'x', length: 4 };
var array3 = concat(array1, array2);

console.log(array3);
// Expected output:  {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f',  length: 6}

console.log('CASE merge two iterables to antoher using concat')
var array4 = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
var array5 = { 0: 'd', 1: 'e', 2: 'f', 3: 'x', 4: 'y', length: 5 };
var array6 = { 0: 'g', 1: 'h', 2: 'i', 3: 'j', length: 4 }
var array7 = concat(array4, array5, array6)
console.log(array7)
// Expected output: {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'x', 7: 'y', 8: 'g', 9: 'h', 10: 'i', 11: 'j', length: 12}