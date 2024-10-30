
function indexOf(iterable, searchElement, fromIndex) {
    //Si existe el argumento fromIndex, empezar la busqueda ahi, si no existe será 0
    if (!fromIndex) {
        fromIndex = 0;
    }
    else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }

    //Recorrer el iterable en busca del elemento
    for (i = fromIndex; i < iterable.length; i++) {
        //Si coindicen, devolver el índice de ese elemento
        if (iterable[i] === searchElement) {
            return i
        }
    }
    //Y si no lo encuentra, devolver un -1
    return -1
}

console.log('TEST indexOf')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log('CASE return bison INDEX')
console.log(beasts.indexOf('bison'));
// Expected output: 1

console.log('CASE return bison INDEX starting fromIndex 2')
// Start from index 2
console.log(beasts.indexOf('bison', 2));
// Expected output: 4

console.log('CASE return noOBJ VALUE INDEX')
console.log(beasts.indexOf('giraffe'));
// Expected output: -1