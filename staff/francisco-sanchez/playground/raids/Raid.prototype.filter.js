//We create the constructor function Raid
//-------------------------------------

var Raid = function () {
    this.length = 0;
}


//we create an instance
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

        if (callback(this[i])) { //si lo que retorna el callback es true, me guardo el elemento en mi nuevo objeto result.
            //result[result.length] = callback(this[i]);
            result[result.length] = this[i];
            result.length++;
        }
    }
    return result;
}

var filtrarMayores = function (palabra) {
    //if (palabra.length > 6) { return palabra; }
    return palabra.length > 6
}


//Aquí instanciamos a las funciones
//----------------------------------------

console.log(palabras.filter(filtrarMayores));
