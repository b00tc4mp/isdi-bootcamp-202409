/*The join() method of Array instances creates and returns a new string by concatenating all of the elements in this array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.*/

/* NOTE: In this version you just can join one single array*/

var vehiculos = {
    0: 'camión',
    1: 'moto',
    2: 'avión',
    3: 'patinete',
    4: 'bicicleta',
    length: 5
};


//CASE: Personal concat function using objects
console.log("")
console.log("Declaring a personal join function")
console.log("------------------------------------")

var defaultSeparator = ',';
var resultadoCadena = '';

var joinPersonal = function (cadena, separator) {

    if (!separator) {
        separator = defaultSeparator;
    }

    /*for (var i = 0; i < cadena.length; i++) {
        if (!cadena[i]) {
            resultadoCadena = resultadoCadena + separator;
        } else {
            resultadoCadena = resultadoCadena + cadena[i] + separator;
        }
    }*/

    for (var i = 0; i < cadena.length; i++) {
        if (i > 0) { // Añadir el separador solo si no es el primer elemento
            resultadoCadena += separator; // Agregar el separador
        }
        resultadoCadena += cadena[i]; // Agregar el elemento
    }

    //var newCadena = resultadoCadena.slice(0, -1); //Con esto mantenemos toda la cadena menos el último carácter

    return resultadoCadena;
}


console.log(joinPersonal(vehiculos, ' * '));