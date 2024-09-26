var indexOf = function (iterable, element, fromIndex) {

    if (!fromIndex) {
        fromIndex = 0
    }
    else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }
    for (var i = fromIndex; i < iterable.length; i++) {

        if (iterable[i] === element) {
            return i;
        }
    }
    return -1
}




console.log('TEST Array.prototype.indexOf')

console.log('Buscar con una properidad que indice tiene')

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 };

var beast = indexOf(beasts, "ant", 2)




console.log(beast)