function unshift(iterable, element) {
    /*
        TRABAJAMOS EN EL MISMO OBJETO

        - Definir el nuevo objeto a añadir
        - cambiar los valores de los elementos de ese objeto al iterable especificado
        - cambiar el índice de todas las propiedades
        - aumentar el length 
    */
    console.log(arguments.length + ' argumentos')

    //CASE 3: AÑADIMOS N ELEMENTOS
    if (arguments.length === 2) {
        iterable[iterable.length] = element
        iterable.length++

        for (i = (iterable.length - 1); i > 0; i--) {
            iterable[i] = iterable[i - 1]
        }
        iterable[0] = element
    }
    else {

        //RECORRER LOS ARGUMENTOS DESDE ATRAS Y AÑADIRLOS AL -1 DEL ITERABLE
        for (i = arguments.length - 2; i > -1; i--) {

            // Desplazar los elementos existentes hacia la derecha
            for (let j = iterable.length; j > -1; j--) {
                iterable[j] = iterable[j - 1];
            }

            // Colocar el elemento en la primera posición
            iterable[0] = arguments[i + 1];

            // Incrementar la longitud del iterable
            iterable.length++;
        }

    }
    return iterable

}

console.log('TEST unshift')

console.log('CASE insert 4 value into nums')

var nums = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
}


unshift(nums, 4)
console.log(nums)



console.log('CASE insert 4, 5 values into nums')

var nums = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
}

unshift(nums, 4, 5)
console.log(nums)

var nums = {
    0: 4,
    1: 5,
    2: 1,
    3: 2,
    4: 3,
    length: 5
}