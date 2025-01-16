/* El método concat() concatena dos arrays y devuelve uno nuevo */

var array11 = ['hola', 'manola', 'mi', 'color', 'realmente'];
var array22 = ['favorito', 'es', 'el', 'amarillo'];
var array33 = ['yupiiiiii', 'yepa!'];

/**
 * This is the standard concat function: 
 */

console.log("CASE: Standard use of concat function")
console.log("-------------------------------------")
var resultadoStandard = array11.concat(array22, array33);
console.log(resultadoStandard);


/**
 * This is my personal concat function 
 * 
 * 
 */


console.log("Declaring a personal concat function")
console.log("------------------------------------")
var concatPersonal = function (arrays) {
    //Declare a result to show the result
    var resultado = [];

    //Saber cuantos arrays me llegan
    /*console.log(arguments.length);*/

    //The first loop is to know how many arguments are arriving to the function and iterate it.
    for (var i = 0; i < arguments.length; i++) {

        //Te second loop is to iterate each array
        for (var j = 0; j < arguments[i].length; j++) {

            //if the result array length = 0, then I use the j value as a first position
            if (resultado.length === 0) {
                resultado[j] = arguments[i][j];

            } else {

                //Otherwise, i calculate the first position to concatenate in the new position
                var posInitial = resultado.length;
                resultado[posInitial] = arguments[i][j];
            }
        }
    }


    return resultado;
}

console.log(concatPersonal(array11, array22, array33));