


var animales = { 0: 'gato', 1: 'perro', 2: 'gallina', 3: 'caballo', length: 4 }; // Declaramos el Array.

var reverse = function (iterable) { // Creamos funcion con iterable.

    var result = { length: 0 }; // Creamos la variable result y le decimos que su longitud es 0 porque todavia está vacia.

    for (var i = iterable.length; i >= 0; i--) {
        // Creamos un for diciendole que index es igual a la longitud del Array
        // index es igual o mayor que cero (le decimos que es menor porque vamos hacia atràs)
        // index -- para que la vuelta la dé hacia atràs.
        result[result.length] = iterable[i - 1];
        // Le decimos que la longitud de result es igual a la posiciòn de iterable que le decimos,
        // En este caso es menos 1 porque empezamos por la ultima posición.
        result.length += 1; // Le decimos que incremente la longitud de result una vez cada vez que recorra.
    }

    animales = result; // la variable animales es igual que la variable result.
    return animales; // devuelve animales
}

console.log(reverse(animales)) // Llamamos a la función.

