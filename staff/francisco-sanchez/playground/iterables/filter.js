//Este es el array general que mostraremos


//Creamos un segundo array en este caso de numeros para sumarlos
var palabras = { 0: 'pelo', 1: 'oreja', 2: 'hombros', 3: 'rodillas', 4: 'brazos', length: 5 }


//aquí declaramos la función map que nos llamará recursivamente a las funciones en cuestión

var filter = function (iterable, callback) {
    var result = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {

        if (callback(iterable[i])) { //Si callback devuelve resultado lo guardamos al nuevo array
            result[result.length] = callback(iterable[i]);
            result.length++;
        }

    }
    return result;
}

var filtrarMayores = function (palabra) {
    if (palabra.length > 6) { return palabra; }
}



console.log('Devolvemos el resultado de las multiplicaciones:')
console.log(filter(palabras, filtrarMayores));

