//Creamos la función constructora Raid
//-------------------------------------

var RaidVehiculos = function () {
    this.length = 0;
}


//Creamos instancias del objeto Raid
//-------------------------------------

var vehiculos = new RaidVehiculos;

vehiculos[0] = 'camión';
vehiculos[1] = 'bicicleta';
vehiculos[2] = 'tractor';
vehiculos[3] = 'campervan';
vehiculos[4] = 'foodtruck';
vehiculos.length = 5;


//Aquí debajo declaramos los métodos que hacen cosas
//--------------------------------------------------

RaidVehiculos.prototype.join = function (separator) {
    var joinedCadena = '';
    var defaultSeparator = ',';

    separator = (!separator ? separator = defaultSeparator : separator);

    for (i = 0; i < this.length; i++) {
        joinedCadena += (i > 0 ? separator : '') + this[i];
    }

    return joinedCadena;
}

//Aquí instanciamos a las funciones
//---------------------------------

var cadenaFinal = vehiculos.join(' ** ');
console.log(cadenaFinal);