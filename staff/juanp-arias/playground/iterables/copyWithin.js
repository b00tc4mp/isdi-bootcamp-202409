console.log('TEST copyWithin')

var copyWithin = function (iterable, target, start) {
    //recorrer el iterable 
    //crear nueva variable
    //insertar objectos en nueva variable
    //retornar array anterior con copia
    var newNums = { length: 0 }
    for (var i = start; i < iterable.length; i++) {
        newNums[newNums.length] = iterable[i]
        newNums.length++
    }

    for (var i = 0; i < newNums.length - target; i++) {
        iterable[target + i] = newNums[i]

    } return iterable

}

console.log('CASE copy number 400 in iterable')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5 }

console.log(copyWithin(nums, 1, 3))

console.log(nums)
//{ 0: 100, 1: 400, 2: 500, 3: 400, 4: 500, length: 5 }



console.log('CASE copy horse in iterable')

var animals = { 0: 'lion', 1: 'dog', 2: 'bear', 3: 'cat', 4: 'horse', length: 5 }

console.log(copyWithin(animals, 1, 3))

console.log(animals)
//{ 0: 'lion', 1: 'horse', 2: 'bear', 3: 'cat', 4: 'horse', length: 5 }

