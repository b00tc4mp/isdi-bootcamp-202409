console.log('TEST Array.prototype.lastIndexOf')

console.log('CASE obtain 100,s index')

var nums = [100, 200, 300, 100]

var index = nums.lastIndexOf(100)
console.log(index)
// 3

var index2 = nums.lastIndexOf(20)
console.log(index2)
// -1

//EL SEGUNDO NUM ES EL INDICE A PARTIR 
//DEL CUAL EMPIEZA A CONTAR
var index3 = nums.lastIndexOf(100, 1)
console.log(index2)
// 0