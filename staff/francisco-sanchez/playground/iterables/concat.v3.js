var obj11 = {
    0: 'hola',
    1: 'manola',
    2: 'mi',
    3: 'color',
    4: 'realmente',
    length: 5
};

var obj22 = {
    0: 'favorito',
    1: 'es',
    2: 'el',
    3: 'amarillo',
    length: 4
};

var obj33 = {
    0: 'yupiiiiii',
    1: 'yepa!',
    length: 2
};

var obj44 = {
    0: 'I\'m the',
    1: 'Boss!',
    length: 2
};



//CASE: Personal concat function using objects returning one single array
console.log('Personal concat function to concatenate as arrays as the user send by parameter');
var concatPersonalArr = function (arrays) {
    var resultado = [];

    for (var i = 0; i < arguments.length; i++) {

        for (var j = 0; j < arguments[i].length; j++) {
            //Always I'll concatenate the new word in the last position of the new array resultado
            resultado[resultado.length] = arguments[i][j];
        }
    }

    return resultado;
}

console.log(concatPersonalArr(obj11, obj22, obj33, obj44));