
function lastIndexOf(iterable, element, fromIndex) {
    /*
    //Recorrer el iterable en busca del elemento
    //Si coindicen, devolver el índice de ese elemento
    //Y si no lo encuentra, devolver un -1
    //Si existe el argumento fromIndex, empezar la busqueda ahi
    // */
    if (!fromIndex) {
        fromIndex = iterable.length
    }
    else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }

    for (var i = fromIndex; i <= iterable.length; i--) {
        if (iterable[i] === element) {
            return i;
        }
    }
    return -1
}

console.log('CASE obtain index of the value 8')

var numbers = {
    0: 2,
    1: 4,
    2: 8,
    3: 16,
    4: 32,
    5: 8,
    length: 6
}
lastIndexOf(numbers, 8)
//OUTPUT ESPERADO 5

console.log('CASE obtain index of value 17 not found')

lastIndexOf(numbers, 17)
//OUTPUT ESPERADO -1

lastIndexOf(numbers, 8, -2)
//OUTPUT ESPERADO 2