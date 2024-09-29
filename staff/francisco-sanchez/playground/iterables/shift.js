/*The shift() method of Array instances removes the first element from an array and returns that removed element. This method changes the length of the array.
The shift() method removes the element at the zeroth index and shifts the values at consecutive indexes down, then returns the removed value. If the length property is 0, undefined is returned.
*/

var barcos = {
    0: 'Pinta',
    1: 'Niña',
    2: 'Santa María',
    3: 'Titanic',
    4: 'Bismark',
    5: 'Victory',
    6: 'Enterprise',
    7: 'Nautilus',
    length: 8
};

var objeto_vacio = {
    length: 0
}

//CASE: Personal shift function to use in object. 
// The function should receive an object and return the same element mutaded without the first object. 
// The function should return too the deleted element. 
// As a second step, we can add a parameter to know if we want to modify the original object or not. 


var shift = function (iterable) {
    if (!iterable) { return undefined; }

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

//Objeto original
console.log("The original barcos object:")
console.log(barcos);

//Eliminamos la primera propiedad del objeto
console.log("The sifted word should be: Pinta")
console.log(shift(barcos));


//Devolvemos el resultado 
console.log("The mutated element should return: '0': 'Niña', '1': 'Santa María', '2': 'Titanic', '3': 'Bismark', '4': 'Victory', '5': 'Enterprise','6':'Nautilus', length: 7'");
console.log(barcos);


//Eliminamos la primera propiedad del objeto
console.log('');
console.log("If we pass an empty object the function should return: undefined")
console.log(shift(objeto_vacio));