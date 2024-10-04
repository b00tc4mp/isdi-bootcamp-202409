var pokemones = { 0: "bulbasaur", 1: "charmander", length: 2 }

var myPush = function (iteracion, elemento) {
    iteracion[iteracion.length] = elemento;
    iteracion.length++
}



var push = function () {

}

var push = function (iterable, element) {
    if (arguments === 2) {
        iterable[iterable.length] = element;
        iterable.length++
    } else {
        for (i = 1; i < arguments.length; i++) {
            iterable[iterable.length] = arguments[i]
            iterable.length++
        }
        return iterable.length
    }
}