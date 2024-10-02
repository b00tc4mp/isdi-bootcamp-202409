function unshift(iterable, element) {
    /*
        TRABAJAMOS EN EL MISMO OBJETO

        - Definir el nuevo objeto a añadir
        - cambiar los valores de los elementos de ese objeto al iterable especificado
        - cambiar el índice de todas las propiedades
        - aumentar el length 
    */

    //CASE 1: AÑADIMOS SOLO 1 ELEMENTO
    if (!element) {
        return iterable
    }
    else {

        iterable[iterable.length] = element
        iterable.length++

        for (i = (iterable.length - 1); i > 0; i--) {
            iterable[i] = iterable[i - 1]
        }
        iterable[0] = element


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


let result = unshift(nums, 4)
console.log(result)
console.log(nums)



