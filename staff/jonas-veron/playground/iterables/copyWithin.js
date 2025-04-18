console.log('TEST copyWithin method in object')
//1er indice es donde se insertara el/los elem copiados
//2on a partir de cual empieza a copiar elem si es negativo, se cuenta desde el final( por defecto es 0)
//3er hasta donde se copia(no inclusive) si es negativo, se cuenta desde el final. por defecto es la longitud del array

// iterable -> {0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}
// result -> {0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}
// result -> {0: 100, 1: 200, 2: 100, 3: 400, 4: 500, length: 5}
// result -> {0: 100, 1: 200, 2: 100, 3: 200, 4: 500, length: 5}
// result -> {0: 100, 1: 200, 2: 100, 3: 200, 4: 300, length: 5}


var copyWithin = function(iterable, target, start){
    if(target < 0){
        target = iterable.length + target
    }

    if(start < 0){
        start = iterable.length + start
    }
    var extracted = {length:0}
    for(var i = start; i < iterable.length - target; i++){
        extracted[extracted.length] = iterable[i]
        extracted.length++
    }
    for(var i = target; i < target + extracted.length; i++){
    iterable[i] = extracted[i - target]
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

console.log('CASE copy with two parametrs')

var nums = {0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5}
var result = copyWithin(nums, 0, 3)
console.log(result)
//{0: 400, 1: 500, 2: 300, 3: 400, 4: 500, length: 5}

