
function indexOf(iterable, searchElement, fromIndex) {
    /*
    //Recorrer el iterable en busca del elemento
    //Si coindicen, devolver el índice de ese elemento
    //Y si no lo encuentra, devolver un -1
    //Si existe el argumento fromIndex, empezar la busqueda ahi
    */
    if (!fromIndex) {
        fromIndex = 0
    }
    else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }

    for (var i = fromIndex; i < iterable.length; i++) {
        if (iterable[i] === searchElement) {
            return i;
        }
    }
    return -1

    //VERSION SIMPLIFICADA
    /*
    for (
        var i = (arguments.length === 2 ? 0 : (fromIndex >= 0 ? fromIndex :
            fromIndex + iterable.length));
        i < iterable.length;
        i++
    )
        if (iterable[i] === searchElement) {
            return i;
        }

    return -1
    */
}

console.log('TEST indexOf')

console.log('CASE obtain index of the value 200')

var numbers = {
    0: 100,
    1: 200,
    2: 300,
    3: 400,
    4: 200,
    length: 5
}
indexOf(numbers, 200)
//OUTPUT ESPERADO 1

console.log('CASE obtain index of value 17 not found')

indexOf(numbers, 17)
//OUTPUT ESPERADO -1