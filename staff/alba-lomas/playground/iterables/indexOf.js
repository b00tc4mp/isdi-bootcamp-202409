


var indexOf = function (iterable, searchelement, fromIndex) {
    /*
    iterar sobre iterable
    si se encuentra searchElement entonces devuelve index,
    en caso contrario devuelve -1
    */

    /*
    iterar sobre iterable desde índice fromIndex,
    si se encuentra searchElement entonces devuelve index,
    en caso contrario devuelve -1
    */

    if (fromIndex === undefined) { // Aqui le estamos diciendo que si fromIndex es estrictamente igual que undefined.
        fromIndex = 0 // FromIndex es igual a 0.
        // Esto quiere decir que se busca con un numero positivo y no desde el final del Array.)

    } else if (fromIndex < 0) { // Aqui le estamos diciendo que si fromIndex es inferior que undefined.
        fromIndex = fromIndex + iterable.length // sumamos el valor de fromIndex al total del Array.
        // Esto quiere decir que se cuenta desde el final del Array para saber la posicion desde la que se comienza a iterar, 
        // Es decir, como es un numero negativo, en realidad se el valor de fromIndex se resta al length del Array.

    }






    for ( // con el bucle for, buscamos el valor que pedimos.
        var i = fromIndex; i < iterable.length;
        // Aqui estamos pidiendo que el buble for comience a buscar desde la posición que nos da fromIndex.
        // si el valor de i es inferior a el length del array pasamos a la var element.
        i++ // si no pasamos a element, le augmentamos 1 al index. Hasta encontrar el valor y entrar en la var element.
    ) {
        var element = iterable[i]; // Aqui le estamos diciendo que element es igual a la posicion que le pedimos del Array que le pedimos.
        if (element === searchelement)
            // Sí element es estrictamente igual que searchelement.
            return i
        // me devuelve directamente la posicion del elemento.
    }

    return -1
    // Devuelve -1 si no se encuentra el valor que pides (esto es igual que undefine)

}

console.log('TEST indexOf')

console.log('CASE get index of green') //CASO obtener índice de green.

var colors = { // Creamos la variable colors.
    0: 'red',
    1: 'blue',
    2: 'yellow',
    3: 'green',
    4: 'purple',
    5: 'pink',
    length: 6
}

var index = indexOf(colors, green)
// Aqui solo le estamos pidiendo de que variable y que elemento queremos que nos dé el valor.
// Por lo tanto como no hay fromIndex, empezarà a recorrer el Array desde la posición 0.
console.log(index) // Aqui estamos ejecutando el codigo
// EXpected output: 3. // Output nos esta dando la posición pedida.


console.log('CASE get index of green from index -2') // CASE obtener índice de green a partir de índice -2'

index = indexOf(colors, 'green', -2)
// Aqui le estamos pidiendo en qué Array queremos que haga la busqueda, que palabra buscamos y desde que posición. 
console.log(index) // Aqui estamos ejecutando el codigo
// Expected output: -1. // Nos da -1 porque a partir de la posición que hemos puesto no hay ningun valor que sea green.


