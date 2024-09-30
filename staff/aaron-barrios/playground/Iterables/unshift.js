function unshift(iterable) {
    /*
        - Definir el nuevo objeto a añadir
        - cambiar los valores de los elementos de ese objeto al iterable especificado
        - cambiar el índice de todas las propiedades
        - aumentar el length 
    */


}

console.log('TEST unshift')

console.log('CASE insert 4, 5 values into iter1')

var iter1 = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
}


let result = unshift(iter1, 4, 5)
console.log(result)

