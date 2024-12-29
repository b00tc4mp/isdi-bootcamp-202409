/*The shift() method of Array instances removes the first element from an array and returns that removed element. This method changes the length of the array.
The shift() method removes the element at the zeroth index and shifts the values at consecutive indexes down, then returns the removed value. If the length property is 0, undefined is returned.
*/

var aviones = {
    0: 'B747',
    1: 'Airbus A320',
    2: 'Aurofighter',
    3: 'F-18',
    length: 4
};

var objeto_vacio = {
    length: 0
}

//CASE: Personal unshift function to use in object. 
// The function should receive an object and return the same element mutaded with new elements at beginning
// As a second step, we can add a parameter to know if we want to modify the original object or not. 


var unshift = function () { // --> Entramos por arguments

    var newAviones = { length: 0 };
    var newAvionesAux = { length: 0 };
    var contarNuevos = 0;


    for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i] + " - " + typeof (arguments[i]));
        if (typeof (arguments[i]) !== 'object') {
            contarNuevos += 1;
            newAvionesAux[i] = arguments[i];
            newAvionesAux.length += 1;
        }
    }
    //Ahora paso newAvionesAux a newAviones
    for (i = 0; i < newAvionesAux.length; i++) {
        newAviones[i] = newAvionesAux[i + 1];
        newAviones.length += 1;
    }

    //Por último añado el array original a newAviones
    for (i = 0; i < arguments[0].length; i++) {
        newAviones[i + 3] = arguments[0][i];
        newAviones.length += 1;
    }

    /*console.log(contarNuevos);
    console.log(newAvionesAux);
    console.log(newAviones);*/

    return newAviones;

}


//Objeto original
console.log("The original aviones object:")
console.log(aviones);

//Añadimos nuevos aviones 
console.log("The unsifted word should be: ")
console.log(unshift(aviones, 'A380', 'B747', 'Cessna 172'));



