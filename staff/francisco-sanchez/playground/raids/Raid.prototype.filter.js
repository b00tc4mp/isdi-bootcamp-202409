//Creamos la función constructora Raid
//-------------------------------------

var Raid = function () {
    this.length = 0;
}


//Creamos instancias del objeto Raid
//-------------------------------------

var palabras = new Raid;
palabras[0] = 'pelo';
palabras[1] = 'cabeza';
palabras[2] = 'oreja';
palabras[3] = 'piernas';
palabras[4] = 'esqueleto';
palabras[5] = 'craneo';
palabras[6] = 'tobillo';

palabras.length = 7;



//Aquí debajo declaramos los métodos que hacen cosas
//--------------------------------------------------

Raid.prototype.filter = function (callback) {
    var result = { length: 0 };
    for (var i = 0; i < this.length; i++) {

        if (callback(this[i])) { //Si callback devuelve resultado lo guardamos al nuevo array
            result[result.length] = callback(this[i]);
            result.length++;
        }
    }

    return result;
}

var filtrarMayores = function (palabra) {
    if (palabra.length > 6) { return palabra; }
}




//Aquí instanciamos a las funciones
//----------------------------------------

console.log(palabras.filter(filtrarMayores));
