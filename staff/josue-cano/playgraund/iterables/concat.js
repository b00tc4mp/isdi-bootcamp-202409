var concat = function(iterable1, iterable2) {
    var result = {};

    // Copio el primer iterable
    for (var i = 0; i < iterable1.length; i++) {
        result[i] = iterable1[i];
    }

    // Copio el segundo iterable, continuando donde quedó el primero
    for (var j = 0; j < iterable2.length; j++) {
        result[i] = iterable2[j];
        i++;
    }

    // Asigno la nueva longitud
    result.length = iterable1.length + iterable2.length;

    return result; // Devuelvo el objeto combinado
};

console.log('Test Concat');

// dos objetos tipo array con la propiedad length
var coches1 = {
    0: 'Fiat',
    1: 'Ford',
    2: 'Chevrolet',
    length: 3
};

var coches2 = {
    0: 'Volkswagen',
    1: 'Toyota',
    length: 2
};

console.log('Caso 1: Concatenar dos objetos tipo array');
console.log(concat(coches1, coches2));
// Resultado: 
// { 0: 'Fiat', 1: 'Ford', 2: 'Chevrolet', 3: 'Volkswagen', 4: 'Toyota', length: 5 }

console.log('Caso 2: Concatenar con un objeto vacío');
console.log(concat(coches1, {length: 0}));
// Resultado: 
// { 0: 'Fiat', 1: 'Ford', 2: 'Chevrolet', length: 3 }


//-------------------------------------------------------------forma 2-------------------------------------------------------------

var concat = function(){
    var result = {length:0}
    for(var j = 0; j < arguments.length; j++){
        for (var i = 0; i < arguments[j].length; i++){
            result[result.length] = arguments[j][i]
            result.length++
        }
    }
    return result
}


console.log('TEST Array.prototype.concat')

console.log('CASE concat an array to two arrays')


var letters= {0: 'a', 1: 'b', 2: 'c', length: 3}
var numbers = {0: 1, 1: 2, 2: 3, length: 3}



var iterable = concat(letters, numbers)
console.log(iterable)
//{0:'a',1: 'b',2: 'c', 3:1, 4: 2, 5: 3, length: 6}

console.log('CASE concat three iterables')

var letters= {0: 'a', 1: 'b', 2: 'c', length: 3}
var numbers = {0: 1, 1: 2, 2: 3, length: 3}
var names= {0: 'juan', 1: 'pepito', 2: 'angel', 3: 'rafa', length: 4}

var total = concat(letters, numbers, names)

console.log(total)



//{0: 'a', 1: 'b', 2: 'c', 3: 1, 4: 2, 5: 3, 6: 'juan', 7: 'pepito', 8: 'angel', 9: 'rafa', length: 10}



/////profesor ---------------------------------

var concat = function () {
    var result = { length: 0 }

    for (var j = 0; j < arguments.length; j++) {
        var iterableX = arguments[j]

        for (var i = 0; i < iterableX.length; i++) {
            var element = iterableX[i]

            result[result.length] = element
            result.length++
        }
    }

    return result
}

console.log('TEST concat')

console.log('CASE concat 2 iterables of characters')

var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 }
var abcdef = concat(abc, def)
console.log(abcdef)
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', length: 6 }

console.log('CASE concat 3 iterables of characters')

var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 }
var ghi = { 0: 'g', 1: 'h', 2: 'i', length: 3 }
var abcdefghi = concat(abc, def, ghi)
console.log(abcdefghi)
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h', 8: 'i', length: 9 }

console.log('CASE concat 4 iterables of characters')

var abc = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var def = { 0: 'd', 1: 'e', 2: 'f', length: 3 }
var ghi = { 0: 'g', 1: 'h', 2: 'i', length: 3 }
var jkl = { 0: 'j', 1: 'k', 2: 'l', length: 3 }
var abcdefghijkl = concat(abc, def, ghi, jkl)
console.log(abcdefghijkl)
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h', 8: 'i', 9: 'j', 10: 'k', 11: 'l', length: 12 }