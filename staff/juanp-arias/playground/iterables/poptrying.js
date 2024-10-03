var push = function (iterable, element) {
    var last = iterable[iterable.length - 1]

    delete iterable[iterable.length - 1]

    iterable.length--

    return last
}


console.log('POPTRYING')

console.log('CASE zorra caballo in animals')

var animals = { 0: 'perro', 1: 'gato', 2: 'pez', 3: 'zorra', length: 4 }
var length = pop(animals, 'caballo')

console.log(animals)
//{'perro', 'gato', 'pez'}
console.log(length)
// 3