console.log('TEST Indexof')

var indexOf = function (palabras, palabraBuscada, indiceInicial) {
    var i = 0;

    if (indiceInicial < 0) {
        i = palabras.length + indiceInicial;
    }

    for (i; i < palabras.length; i++) {
        if (palabras[i] === palabraBuscada) {
            return i;
        }
    }
    return -1;
};

var palabras = {
    0: 'la',
    1: 'le',
    2: 'li',
    3: 'lo',
    4: 'lu',
    length: 5
}


console.log(indexOf(palabras, 'lo'));   //  3
