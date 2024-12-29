/*The join() method of Array instances creates and returns a new string by concatenating all of the elements in this array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.*/

/* NOTE: In this version you just can join one single array*/


var array11 = ['hola', 'manola', 'mi', 'color', , , 'realmente'];

/**
 * This is the standard join function: 
 */

console.log("CASE: Standard use of JOIN function")
console.log("-------------------------------------")

console.log(array11.join(' * '));
// Expected output: "hola * manola * mi * color * realmente"

console.log(array11.join());
// Expected output: "favorito,es,el,amarillo"

console.log(array11.join('-'));
// Expected output: "yupiiiiii-yepa!"



/**
 * This is my personal join function 
 * 
 * 
 */

console.log("")
console.log("Declaring a personal join function")
console.log("------------------------------------")

var defaultSeparator = ',';
var resultadoCadena = '';

var joinPersonal = function (cadena, separator) {

    if (!separator) {
        separator = defaultSeparator;
    }

    for (var i = 0; i < cadena.length; i++) {
        if (!cadena[i]) {
            resultadoCadena = resultadoCadena + separator;
        } else {
            resultadoCadena = resultadoCadena + cadena[i] + separator;
        }
    }
    var newCadena = resultadoCadena.slice(0, -1); //Con esto mantenemos toda la cadena menos el último carácter

    return newCadena;
}
console.log(joinPersonal(array11, ' XX '));