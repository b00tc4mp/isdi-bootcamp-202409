
function reverse(iterable) {

    //recorrer todo el iterable 
    //invertir los índices

    //esta es la longitud del iterable que la guardamos en local
    //para modificarla 
    let length = iterable.length;

    //obtienes el valor mas alto de length y lo partes a la mitad
    for (let i = 0; i < Math.floor(length / 2); i++) {

        //variable que me guarda el valor del índice actual
        let currentValue = iterable[i];
        //de mi indice i cojo el indice total del iterable y le resto 1 e i 
        //para cuando se incrementa
        iterable[i] = iterable[length - 1 - i]
        //invierto el valor del índice actual con el último
        iterable[length - 1 - i] = currentValue
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
var reversedd = reverse(numbers)
console.log(reversedd)

console.log('CASE reverse numbers')

var numbers = {
    0: 'Hola',
    1: 1,
    2: 2,
    3: 3,
    4: 'Adios',
    length: 5
}
var reversedd = reverse(numbers)
console.log(reversedd)

console.log('CASE reverse numbers[0]')

var numbers = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    length: 4
}

var test1 = reverse(numbers);
test1[0] = 5;
console.log(numbers[0]); // 5

