var fill = function (iterable, elemento, start, end) {
    // we may not need the first if  since it doesn't change the object
    if (start < 0 || end < 0) {
        start += iterable.length
        end += iterable.length
    }
    if (arguments === 2) {
        for (var i = 0; i < iterable.length; i++) {
            iterable[i] = elemento
        }
        return iterable
    } else if (arguments === 3) {
        for (var i = start; i < iterable.length; i++) {
            iterable[i] = elemento
        }
        return iterable
    } else {
        for (var i = start; i < end; i++) {
            iterable[i] = elemento
        }
        return iterable
    }

}

console.log('CASE fill the whole array with x')

var obj = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }
var newObject = fill(obj, 'x')
console.log(newObject);
//{0: 'x', 1: 'x', 2: 'x', 3:'x', length: 4}


console.log('CASE fill with fromIndex')
var obj1 = {
    0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4
}
var newObject1 = fill(obj, 'x', 2)
console.log(newObject1)
//{0: 'a', 1: 'b', 2: 'x', 3: 'x', length: 4}

console.log('CASE fill x with fromIndex until end')

var array2 = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }
var newArray2 = fill(array2, 'x', 1, 3)
console.log(newArray2)
//{ 0: 'a', 1: 'x', 2: 'x', 3: 'd', length: 4 }

console.log('CASE fill x with negative arguments')

var array3 = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 }
var newArray3 = fill(array3, 'x', -3, -1)
console.log(newArray3)
//{ 0: 'a',1: 'b',2: 'c',3: 'x',4: 'x',5: 'f', length: 6 }