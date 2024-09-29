# Creación de iterables 
*Documento creado por Francisco Sánchez el 28/09/2024*

## Ficheros añadidos y correcciones
## --------------------------------

## concat.js
*28/09/2024*
Se corrige un error que hacía que el resultado final del ejercicio se devolviera en un array y no en un objeto. 
La lógica para devolver el resultado final correctamente ha sido: 


    `console.log('Personal concat function to concatenate as arrays as the user send by parameter');
    var concatPersonalObj = function (arrays) {
    var objResultado = { length: 0 };

    for (var i = 0; i < arguments.length; i++) {

        for (var j = 0; j < arguments[i].length; j++) {
            //Always I'll concatenate the new word in the last position of the new array resultado
            objResultado[objResultado.length] = arguments[i][j];
            objResultado.length++;
        }
    }
    return objResultado;
    }

    console.log(concatPersonalObj(obj11, obj22, obj33, obj44));
    `

## Reverse
*28/09/2024*

### Array.prototype.reverse.js
Se añade la función Array.prototype.reverse con explicaciones y funcionameniento

### reverse.js
Se ha creado la función personalizada reverse.js con una peculiaridad. 
Hacemos la llamada a la función en dos parámetros: 
- El primero es el array que queremos reversear
- El segundo es un indicador que le dice a la función si debe mutar el array origina. 

De esta manera podemos operar sobre la función como si trabajaramos con reverse() o toReversed() respectivamente 

    `   var reverse = function (iterable, mutateOriginal) {
    var reversedIterable = { length: 0 };

    console.log(iterable.length);

    for (i = iterable.length; i > 0; i--) {
        console.log(iterable[i - 1]);
        reversedIterable[reversedIterable.length] = iterable[i - 1];
        reversedIterable.length++;
    }

    if (mutateOriginal === undefined || mutateOriginal === 'y') {
        barcos = reversedIterable;
    }

    return reversedIterable;
    }`


## Shift()
*29/09/2024*
Se suben los archivos Array.prototype.shift y la función personalizada shift para eliminar el primer elemento de un objeto. 
Seguramente no será la versión más optimizada de todas pero funciona de la misma manera que la función original. 
`
    var shift = function (iterable) {
    var shiftedIterable = { length: 0 };
    var shiftedWord = iterable[0];
    //console.log(shiftedWord);

    delete iterable[0];
    iterable.length--;
    //console.log(iterable);

    //Now we'r going to update the indexes of the object. 
    //First we are re indexing all ellements to i-1
    for (i = 1; i <= iterable.length; i++) {
        iterable[i - 1] = iterable[i];
    }
    //Finnally we just delete the last repeated element
    delete iterable[iterable.length];

    return shiftedWord;
    }
`

