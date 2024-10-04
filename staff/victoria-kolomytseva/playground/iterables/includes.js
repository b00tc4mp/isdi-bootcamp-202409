//                        colores , 'rojo'   
var includes = function (iterable, value, value2) {
    if (value2 === undefined) {
        value2 = 0
    }
    for (var i = value2; i < iterable.length; i++) {
        if (iterable[i] === value) {
            return true;
        }
    }
    return false;
}






console.log('Case compare searchElement to elements of the array using the algorithm.')

var colores = { 0: 'rojo', 1: 'verde', 2: 'azul', 3: 'amarillo', 4: 'blanco', length: 5 }

var color = includes(colores, 'rojo')

console.log(color)
//true

var color1 = includes(colores, 'negro')

console.log(color1);
//false


console.log('Case compare searchElement with fromIndex to elements of the array using the algorithm.')

var colores = { 0: 'rojo', 1: 'verde', 2: 'azul', 3: 'amarillo', 4: 'blanco', length: 5 }

var color3 = includes(colores, 'rojo', 1)

console.log(color3)
//false


