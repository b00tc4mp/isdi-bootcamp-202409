var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 };
var index = indexOf(beasts, 5)
//Recorrer el iterable en busca del elemento.
//Si coinciden,devuelves el indice de ese elemento.
//Si no lo encuentra,devolver -1.
//Si existe el argumento fromIndex, empezar la busqueda a partir de dicho indice.


var indexOf = function (iterable, element, fromIndex) {
    if (!fromIndex) {
        fromIndex = 0
    }
    else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }
    for (var i = fromIndex; i < iterable.length; i++) {
        if (iterable[i] === element) {
            return i
        }
    }
    return -1
}




//pibardos
var indexOf = function (iterable, element, index) {
    if (index === undefined) {
        index = 0
    }
    if (index < -iterable.length || index >= iterable.length) {
        return -1
    }
    else if (index < 0) {
        index = iterable.length + index
    }
    for (index; index < beasts.length; index++) {
        if (iterable[index] === element) {
            return index
        }

    }
}


//arreglo
var indexOf = function (iterable, element, index) {
    if (index === undefined) {
        index = 0
    }
    else if (index < 0) {
        index = iterable.length + index
    }
    for (index; index < beasts.length; index++) {
        if (iterable[index] === element) {
            return index
        } else { return -1 }

    }

}//Recorrer el iterable en busca del elemento.
//Si coinciden,devuelves el indice de ese elemento.
//Si no lo encuentra,devolver -1.
//Si existe el argumento fromIndex, empezar la busqueda a partir de dicho indice.
var indexOf = function (iteracion, elemento, index) {
    if (!index) {
        index = 0
    }
    else if (index < 0) {
        index = iteracion.length + index
    }
    for (index; index < iteracion.length; index++) {
        if (iteracion[index] === elemento) {
            return index
        } else { return -1 }
    }
}