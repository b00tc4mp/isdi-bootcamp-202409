var push = function (iterable, element) {
    /*
    - declarar el length del iterable y añadir el elemento
    - incrementar el length del iterable
    */

    //SI LOS ARGUMENTOS SON 2 (SOLO AÑADO 1 ELEMENTO)
    if (arguments === 2) {
        iterable[iterable.length] = element
        iterable.length++
    }

    //EN CASO DE QUE HAYA MÁS DE 1 ELEMENTO RECORRO EL PRIMER ELEMENTO Y LO AÑADO, LUEGO EL SEGUNDO Y LO AÑADO
    else {
        for (var i = 1; i < arguments.length; i++) {
            var element = arguments[i]

            iterable[iterable.length] = element
            iterable.length++
        }
    }
}
console.log('TEST push')

console.log('CASE add 400 to nums')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
push(nums, 400)
console.log(nums)
//var nums = { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 }