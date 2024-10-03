console.log('TEST Array.prototype.at')
//Esta función te muestra un valor dependiendo del indice que le indiques, cuando es negativo empieza la cuenta desde la útlima propiedad hacia delante..
console.log('CASE get num at index 3 in nums')

var nums = [100, 200, 300, 400, 500]
//positions: 0:   1:   2:   3:   4:  
var num = nums.flat(3)
console.log(num)
// 400 (position 3)

console.log('CASE get num at index -3 in nums')

var nums = [100, 200, 300, 400, 500]
//negatives: -5   -4   -3   -2   -1  
var num = nums.flat(-3)
console.log(num)
// 300 (position -3)

console.log('CASE get num at index -10 in nums')

var nums = [100, 200, 300, 400, 500]

var num = nums.at(-10)
console.log(num)
// undefined (resulta undefined porque se sale de rango)

console.log('CASE get number at index 10 in nums')

var nums = [100, 200, 300, 400, 500]

var num = nums.at(10)
console.log(num)
// undefined (resulta undefined porque se sale de rango)