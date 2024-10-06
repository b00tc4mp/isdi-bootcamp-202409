console.log('TEST copyWithin method in object')
//1er indice es donde se insertara el/los elem copiados
//2on a partir de cual empieza a copiar elem si es negativo, se cuenta desde el final( por defecto es 0)
//3er hasta donde se copia(no inclusive) si es negativo, se cuenta desde el final. por defecto es la longitud del array

// iterable -> {0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}
// result -> {0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}
// result -> {0: 100, 1: 200, 2: 100, 3: 400, 4: 500, length: 5}
// result -> {0: 100, 1: 200, 2: 100, 3: 200, 4: 500, length: 5}
// result -> {0: 100, 1: 200, 2: 100, 3: 200, 4: 300, length: 5}

// var copyWithin = function(iterable, target){
//  var result = {length:0}
//  var start = iterable.length - target
//  //hacemos un for para copiar el objeto original
//    for(var i = 0; i < iterable.length; i++){
//     var element = iterable[i]
//     result[result.length] = element
//     result.length++
//     }
//    for(var i = 0; i < start; i++){
//     var element = iterable[i]
//     result[target+i] = element
//    }
//     return result
// }

var copyWithin = function(iterable, target){
 var extracted = {length:0}
 for(var i = 0; i <= target; i++){
  extracted[extracted.length] = iterable[i]
  extracted.length++
 }
 for(var i = target; i < iterable.length; i++){
  iterable[i] = extracted[i]
 }
 return iterable
}


console.log('CASE copy with one element')

var nums = {0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}
var result = copyWithin(nums, 2)
console.log(result)
//{0: 100, 1: 200, 2: 100, 3: 200, 4: 300, length: 5}

console.log('CASE copy with one element')

var nums = {0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}
var result = copyWithin(nums, -2)
console.log(result)
//{0: 100, 1: 200, 2: 300, 3: 100, 4: 200, length: 5}

console.log('CASE Copy to index 0 the element at index 3')

var array1 = ['a', 'b', 'c', 'd', 'e']

console.log(array1.copyWithin(0, 3, 4));
// ["d", "b", "c", "d", "e"]