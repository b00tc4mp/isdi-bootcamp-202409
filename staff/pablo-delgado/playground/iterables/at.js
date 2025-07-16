var at = function (iterable, index) {
    if (index >= 0) {
        var element = iterable[index]
        return element
    } else {
        var newIndex = index + iterable.length
        var element = iterable[newIndex]
        return element
    }
}

var numeros = { 0: 10, 1: 20, 2: 30, 3: 40, length: 4 }
var numero = at(numeros, 2)

console.log(numero)

// now a negative one

var numero = at(numeros, -2)

console.log(numero)