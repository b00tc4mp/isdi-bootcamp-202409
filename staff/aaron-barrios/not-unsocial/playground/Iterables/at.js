var functionAt = function (iterable, index) {
    /*  CASE POSITIVE INDEX
        - acceder al iterable y obtener indice
        - return undefined if index is not found

        CASE NEGATIVE INDEX
        - calcular el indice añadiendo al negativo el length del iterable
        - extraer elemento del iterable
    */

    var element

    if (index > -1) {
        element = iterable[Math.floor(index)]
    }
    else {
        var newIndex = iterable.length + (Math.ceil(index))
        element = iterable[newIndex]
    }

    return element

    /*FORMA SIMPLIFICADA
    return iterable[index > -1 ? Math.floor(index) : (Math.ceil(index) + iterable.length]
    */
}

console.log('TEST at')

console.log('CASE get number at index 3 in nums')

var nums = {
    0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5
}

var num = functionAt(nums, 3)
console.log(num)
//400

console.log('CASE obtain index -3 de nums')

var nums = {
    0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5
}

var num = functionAt(nums, -3)
console.log(num)
//300


console.log('CASE obtain index outofRange of nums')

var num = functionAt(nums, 10)
console.log(num)
// undefined
