console.log('CASE get number at index 3 in nums')
/*
    Identificar el valor de la propiedad con el indice indicado.
    Siempre devuelve undefined si no encuentra el index.
    Devolver el elemento en el iterable
    */ 
var at = function (iterable,index) {

    var element = iterable[index]

    return element
}
// darle la lista 
// devuelve el valor de la posicion

var nums = {0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length : 5}

var num = at(nums,3)

console.log(nums)
console.log(num)