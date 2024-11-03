console.log('TEST push')
//Intentamos entender cómo funciona el método push en Arrays apartir de un objeto
var push = function (iterable, element) {
    /*declaramos la variable push la cual será una función, esta función para poder llamarla debe contar con dos elementos(iterable: objecto en el cual debe añadir/ y elemento que quieres añadir.)
    */
    if (arguments.length === 2) {  //esto indica si los argumentos son estrictamente iguales a 2 (iterable y elemento) reproducemen lo siguiente:
        iterable[iterable.length] = element //súmame el elemento que te indico al final de mis elementos
        iterable.length++ // y añademe una posición a mi length
    } else { // si la condicón de arriba no se cumple
        for (var i = 1; i < arguments.length; i++) {
            var element = arguments[i]

            iterable[iterable.length] = element
            iterable.length++
        }
    }
    return iterable.length
}

console.log('CASE add 400 to nums')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var length = push(nums, 400)

console.log(nums)
// { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 } //agrrgamos en la última posición el número 400.
console.log(length)
// 4 // aumenta el length porque ya tenemos un número más

console.log('CASE add banana to fruits')

var fruits = { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pinneaple', length: 4 }
var length = push(fruits, 'banana')

console.log(fruits)
//{ 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pinneaple', 4: 'banana', length: 5}
console.log(length)
// 5

console.log('CASE add banana pear and coconut to fruits')

var fruits = { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', length: 4 }
var length = push(fruits, 'banana', 'pear', 'coconut')

console.log(fruits)
// ['apple', 'orange', 'raspberry', 'pineapple', 'banana', 'pear', 'coconut'] (7)
console.log(length)
// 7