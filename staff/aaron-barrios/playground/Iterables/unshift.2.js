function unshift(iterable, element, element2) {
    /*
        TRABAJAMOS EN EL MISMO OBJETO

        - Definir el nuevo objeto a añadir
        - cambiar los valores de los elementos de ese objeto al iterable especificado
        - cambiar el índice de todas las propiedades
        - aumentar el length 
    */

    //CASE 2: AÑADIMOS 1 O 2 ELEMENTOS
    if (!element) {
        return iterable
    }
    else {

        if (!element2) {
            iterable[iterable.length] = element
            iterable.length++

            for (i = (iterable.length - 1); i > 0; i--) {
                iterable[i] = iterable[i - 1]
            }
            iterable[0] = element
        }
        else {
            iterable[iterable.length] = element
            iterable.length++

            iterable[iterable.length] = element2
            iterable.length++

            for (i = (iterable.length - 1); i > 1; i--) {
                iterable[i] = iterable[i - 2]
            }
            iterable[0] = element
            iterable[1] = element2
        }
    }

}

console.log('TEST unshift')

console.log('CASE insert 4 value into nums')

var nums = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
}


var result = unshift(nums, 4)
console.log(result)
console.log(nums)



console.log('CASE insert 4, 5 values into nums')

var nums = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
}


var result = unshift(nums, 4, 5)
console.log(result)
console.log(nums)
