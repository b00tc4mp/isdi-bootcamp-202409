//Creamos la función constructora Raid
//-------------------------------------

var RaidBarcos = function () {
    this.length = 0;
}


//Creamos instancias del objeto Raid
//-------------------------------------

var barcos = new RaidBarcos;
barcos[0] = 'Pinta';
barcos[1] = 'Niña';
barcos[2] = 'Santa María';
barcos[3] = 'Titanic';
barcos[4] = 'Bismark';
barcos[5] = 'Victory';
barcos[6] = 'Enterprise';
barcos[7] = 'Nautilus';
barcos.length = 8;



//Aquí debajo declaramos los métodos que hacen cosas
//--------------------------------------------------

RaidBarcos.prototype.reverse = function () {
    var element = '';

    //For de adelante hacia atrás
    for (var i = 0; i < Math.floor((this.length) / 2); i++) {
        var element = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = element;
    }

    return this;
}

//Aquí instanciamos a las funciones
//---------------------------------

console.log(barcos.reverse());
