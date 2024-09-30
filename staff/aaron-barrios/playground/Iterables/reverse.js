
function reverse(iterable) {

    //recorrer todo el iterable 
    //invertir los índices

    //esta es la longitud del iterable que la guardamos en local
    //para modificarla 
    let length = iterable.length;

    for (let i = 0; i < Math.floor(length / 2); i++) {

        //variable que me guarda el valor del índice actual
        let temp = iterable[i];
        //de mi indice i cojo el indice total del iterable y le resto 1 y la i para cuando se incrementa
        iterable[i] = iterable[length - 1 - i]
        //invierto el valor del índice actual con el último
        iterable[length - 1 - i] = temp
    }
    return iterable
}

console.log('CASE reverse numbers')

var numbers = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    length: 4
}

// reverse(numbers)
// // OUTPUT ESPERADO
// {
//     (4, 3, 2, 1)
// }

