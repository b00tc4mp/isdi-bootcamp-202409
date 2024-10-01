var setas = {
    0: "Ceps",          // Ceps
    1: "Champiñón",      // Champiñón común
    2: "Rebozuelo",  // Rebozuelo
    3: "Oronja",       // Oronja
    4: "Seta de ostra",    // Seta de ostra
    5: "Colmenilla",    // Colmenilla
    6: "Níscalo",   // Níscalo
    7: "Parasol",   // Parasol
    8: "Negrilla",     // Negrilla
    9: "Barbuda",        // Barbuda
    length: 10,
};


var slice = function (iterable, ini, fin) {
    var newIterable = { length: 0 }
    var IndexIni;
    var IndexFin

    //Evaluamos IndexIni
    if (ini > -1 && ini < iterable.length) { //ini positivo y dentro de rango
        IndexIni = ini;
    } else if (ini < 0) {  //ini negativo
        IndexIni = iterable.length + ini;
    } else if (ini > iterable.length || ini === undefined) {  //ini fuera de rango o no definido
        IndexIni = 0;
    }


    //Evaluamos IndexFin
    if (fin < iterable.length && fin > -1) {  //fin dentro de rango y positivo
        IndexFin = fin
    } else if (fin < 0) {  //fin negativo
        IndexFin = iterable.length + fin;
    } else if (fin === undefined || fin > iterable.length) { //fin no definido o fuera de rango
        IndexFin = iterable.length;
    }


    //Aquí tenemos el for con el que recorremos el array
    for (var i = IndexIni; i < IndexFin; i++) {
        newIterable[newIterable.length] = iterable[i];
        newIterable.length += 1;
    }


    return newIterable;
}


//CASE 1. Introducimos valores inicio y fin existentes dentro del array inicial
console.log("Devolverá Champiñón, Rebozuelo, Oronja")
console.log(slice(setas, 2, 3))
console.log("----\n")


//CASE 2. Introducimos valores inicio existende dentro del array, fin mayor que fin del array
console.log("Devolverá todo el array desde seta de la ostra hasta el final")
console.log(slice(setas, 4, 99))
console.log("----\n")


//CASE 3. Introducimos valores de inicio existente y un fin negativo. 
console.log("Devolverá Rebozuelo y Oronja")
console.log(slice(setas, 2, -6))
console.log("----\n")


//CASE 4. No incluimos el valor final de búsqueda
console.log("Devolverá todo el array completo desde Campiñón ")
console.log(slice(setas, 1))
console.log("----\n")