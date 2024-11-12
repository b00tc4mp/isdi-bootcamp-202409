var barcos = {
    0: 'Pinta',
    1: 'Niña',
    2: 'Santa María',
    3: 'Titanic',
    4: 'Bismark',
    5: 'Victory',
    6: 'Enterprise',
    7: 'Nautilus',
    length: 8
};

// Le cambiamos completamente el enfoque para transponer los elementos

var reverse = function (iterable) {
    var element = '';

    //For de atras hacia adelante
    /*for (var i = iterable.length - 1; i > Math.floor((iterable.length - 1) / 2); i--) {
        var element = iterable[i];
        iterable[i] = iterable[iterable.length - 1 - i];
        iterable[iterable.length - 1 - i] = element;
    }*/


    //For de adelante hacia atrás
    for (var i = 0; i < Math.floor((iterable.length) / 2); i++) {
        var element = iterable[i];
        iterable[i] = iterable[iterable.length - 1 - i];
        iterable[iterable.length - 1 - i] = element;
    }

    return iterable;
}


// The second parameter on the function let the function know if should modify the original array or not.
// If the second parameter is 'y': will mutate the original, if 'n': the original wont be mutated
console.log(reverse(barcos));