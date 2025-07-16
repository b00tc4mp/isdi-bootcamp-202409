var join = function (iterable) {
    var result

    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]

        if (i === 0)
            result = element
        else
            result += ',' + element
    }

    return result
}

console.log('TEST join')

console.log('CASE join elements')

var comida = { 0: 'salmorejo', 1: 'gazpacho', 2: 'ajoblanco', 3: 'boquerones', length: 4 }
var food = join(comida)
console.log(food)
// salmorejo,gazpacho,ajoblanco,boquerones