
const firstElement = array1.shift();

console.log(array1);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1


var shift = function (iterable) {
    var first = iterable[0]
    delete iterable[0]
    for (i = 1; i < iterable.length; i++) {
        iterable[i - 1] = iterable[i]
    }
    iterable.length--
    delete iterable[iterable.length]

    return first
}



var array1 = { 0: 1, 1: 2, 2: 3, length: 3 };


var shift = function (iterable) {
    var first = iterable[0]
    delete iterable[0]
    for (var i = 1; i < iterable.length; i++) {
        iterable[i - 1] = iterable[i];
    }
    iterable.length--
    delete iterable[iterable.length]
    return first
}



















