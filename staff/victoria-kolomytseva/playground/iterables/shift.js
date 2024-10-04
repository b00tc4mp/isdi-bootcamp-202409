var shift = function (iterable) {

    var el = iterable[0];

    for (var i = 1; i < iterable.length; i++) {
        iterable[i - 1] = iterable[i];
    }


    delete iterable[iterable.length - 1];
    iterable.length = iterable.length - 1;

    return el;

}


console.log('CASE  removes the first element from an array1')

const array1 = { 0: 10, 1: 25, 2: 3, length: 3 };

const firstElement = shift(array1);

console.log(array1);
// Expected output: Array [25, 3]

console.log(firstElement);
// Expected output: 10