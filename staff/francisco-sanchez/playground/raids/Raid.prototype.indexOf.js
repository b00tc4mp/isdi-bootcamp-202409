//Creamos la función constructora Raid
//-------------------------------------
var Raid = function () {
    this.length = 0;
}

//Aquí debajo declaramos los métodos que hacen cosas
//-------------------------------------
Raid.prototype.indexOf = function (searchElement, startIndex) {
    /*this[this.length] = element;
    this.length += 1;
    return this.length;*/

    if (startIndex === undefined) {
        startIndex = 0;
    } else if (startIndex < 0) {
        startIndex = this.length + startIndex;
    }

    //console.log(this.length);
    for (var i = startIndex; i < this.length; i++) {
        if (this[i] === searchElement) {
            return i;
        }
    }
    return -1;
}

//Creamos una instancia del objeto Raid
//-------------------------------------
var veggies = new Raid;


//Creamos iniciamos el objeto plants con valores
//---------------------------------------------
veggies[0] = 'brocoli';
veggies[1] = 'cauliflower';
veggies[2] = 'cabagge';
veggies[3] = 'kale';
veggies[4] = 'tomato';
veggies.length = 5


//Aquí instanciamos a las funciones
//----------------------------------------

var indexedAt = veggies.indexOf('kale', 3)
console.log('Está en: ' + indexedAt);