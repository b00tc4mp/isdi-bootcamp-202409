var at = function (iterable, index) {
    //buscar en el iterable el elemnto que se encuentra en el index
    //siempre te va a devolver indefined si no encuentra el index

    if (index > 0) {
        return iterable[iterable.length + index];
    }

    return iterable[index];

}


console.log('CASE locate 5 from num')
var num = { 0: 1, 1: 9, 2: 11, 3: 15, 4: 50, 5: 4, 6: 45, length: 7 }
var index = at(num, 5)
console.log(index)
//4

console.log('CASE locate  from num')
var num = { 0: 1, 1: 9, 2: 11, 3: 15, 4: 50, 5: 4, 6: 45, length: 7 }
var index = at(num, -3)
console.log(index)
//50