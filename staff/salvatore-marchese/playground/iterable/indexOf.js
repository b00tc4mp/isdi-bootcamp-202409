console.log('TEST Array.prototype.indexOf')
console.log('CASE find the indexOf of the colors')

var indexof = function(iterable, element){
    //recorrer el iterable en busca del elemento 
    // si coinciden, devuelven el indice de ese elemento (resultado 2)
    // si no lo encuentra, devuelve resultado -1 
    // si existe el argumento startIndex empezar la buscqueda a partir del mismo

    for (var i = fromIndex; i < iterable['length']; i++) {
        if (iterable[i] === element)
            return i
    }
    return -1
} 

var color = colors.indexOf('red')

//-//
var numbers = [2, 4, 8, 16, 32]

var number = numbers.indexOf(8)

var number2 = numbers.indexOf(20)

console.log(number)
//expected output: 2 (2 como valore found)

console.log(number2)
//expected output: -1 (-1 como valore not found)


var colors = ['red', 'blue', 'white', 'red', 'black']

var color = colors.indexOf('white')
console.log(color)
//expected: 2 found

var color2 = colors.indexOf('purple')
console.log(color2)
//expected: -1 not found

var color3 = colors.indexOf('red', 1)
console.log(color3)
// expected: 3 ( cuenta el elemento a partir de la posicion 1 entonces el primer red no se cuenta por que en posicion 0; blue/1 white/2 red/3)