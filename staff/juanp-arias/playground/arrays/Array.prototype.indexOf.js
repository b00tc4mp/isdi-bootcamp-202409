console.log('TEST Array.prototype.indexOf')
//Esta función te muestra el indice en el que está posicionado el elemento que estamos buscando.
console.log('CASE get index of c')

var chars = ['a', 'b', 'c', 'b', 'a']

var index = chars.indexOf('c')
console.log(index)
// 2

console.log('CASE get index of c from index -2')

var chars = ['a', 'b', 'c', 'b', 'a']

var index = chars.indexOf('c', -2)
console.log(index)
// -1 valor que muestra si no encuentra el objeto que le estamos pidiendo como undefined.