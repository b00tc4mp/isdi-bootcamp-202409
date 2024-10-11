
//EJECUCIÓN DEL CODIGO

// DE FORMA POSITIVA: (Partiendo de la posicion 0 del array )

var at = function (iterable, index) {
    // Buscar en el iterable (objeto con elementos dentro (ej:Array)) el elemento que se encuentra en el index.
    // Siempre devuelve undefined si index < -array.length o index >= array.length.
    if (index >= 0) {
        return iterable[index]
        // Este if indica que si el index (posicion del valor) es igual o superior a 0 (positivo), devuelva el elemento que hay en esa posición.
    }

    // DE FORMA NEGATIVA: (Partiendo del final del Array)
    else {
        return iterable[iterable.length + index]
        // En este caso else pide que si el index se pide de forma negativa (contando desde el final del Array) me dé el valor desde la posición que queda restando el negativo que se pide al largo total del Array.
    }
}



// CREACIÓN DE LAS VARIABLES:

var countries = { 0: 'French', 1: 'Germany', 2: 'Italy', 3: 'Spain', length: 5 };



console.log('CASE locate spain from countries') //(CASO localiza españa en paises)

// de forma positiva:

var country = at(countries, 3) // Aqui creo la variable country para que busque dentro de la variable countries, la cuidad que està en la posición 3.
// Como el valor que se pide es positivo, se cumple el if y me da directamente el valor.
console.log(country) // Llamo a la función.
// Spain (el output me la Spain porque es el nombre que hay en la posición que le he pedido.)



console.log('CASE locate Germany from countries') //(CASO localiza alemania en paises)

// de forma negativa: 

var country = at(countries, -3) // Aqui creo la variable country para que busque dentro de la variable countries, la cuidad que està en la posición -3.
// Como el valor que se pide es negativo, por lo tanto no se cumple el if y me baja al else.
console.log(country) // Llamo a la función.
// Germany (el output me la Germany porque es el nombre que hay en la posición que le he pedido.)