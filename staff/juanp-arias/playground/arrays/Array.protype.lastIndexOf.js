console.log('TEST Array.prototype.lastIndexOf')
//Esta función te muestra el indice de un objeto buscando la última aparición de este.
console.log('CASE get lastIndexOf b')

var chars = ['a', 'b', 'c', 'b', 'a']

var lastIndexOf = chars.lastIndexOf('b')
console.log(lastIndexOf)
// 3 (porque el último elemento 'b' está en la posición 3)

console.log('CASE get index of b from index -2')

var chars = ['a', 'b', 'c', 'b', 'a']

var lastIndexOf = chars.lastIndexOf('c', -2)
console.log(lastIndexOf)
// 2 (inicia la cuenta desde atrás la posición -2 y desde allí empoieza a contar hasta que encuentra la b.)