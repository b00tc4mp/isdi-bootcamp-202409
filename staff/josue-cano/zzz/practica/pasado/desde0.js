var frutas = ["melon", "fresa", "platano" ,"kiwi"];
console.log(frutas);

frutas.push('naranja', 'mandarina');
console.log(frutas);

var push = function(parametro, elemento){
    parametro[parametro.length] = elemento;
    parametro.length++;
    return parametro.length;
}



var frutas = {
    0 : 'melon',
    1 : 'fresa',
    2 : 'melocoton',
    length : 3
}

var frut = push(frutas, 'platano');

console.log(frut);