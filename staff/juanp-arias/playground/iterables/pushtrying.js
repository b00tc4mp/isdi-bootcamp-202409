var push = function(iterable, element){
    iterable[iterable.length] = element
    iterable.length++
}




console.log('PUSHTRYING')

console.log('case add caballo in animals')

var animals = { 0: 'perro', 1: 'gato', 2: 'pez', 3: 'zorra', length: 4}
var length = push(animals, 'caballo')

console.log(animals)
//{'perro', 'gato', 'pez', 'zorra', 'caballo'}
console.log(length)
// 5
