


var reverse = function (iterable) {

    var result = { length: 0 };

    for (var i = iterable.length; i >= 0; i--) {

        result[result.length] = iterable[i - 1];

        result.length += 1;
    }

    animales = result;
    return animales;
}

console.log(reverse(animales))


var animales = { 0: 'gato', 1: 'perro', 2: 'gallina', 3: 'caballo', length: 4 };