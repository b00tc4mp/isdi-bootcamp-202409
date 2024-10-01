//Creamos la función constructora Raid
//-------------------------------------
var Raid = function () {
    this.length = 0;
}

//Aquí debajo declaramos los métodos que hacen cosas
//-------------------------------------
Raid.prototype.pop = function () {
    var deleted = this[this.length - 1]
    delete this[this.length - 1]
    this.length--;

    return deleted;
}

//Creamos una instancia del objeto Raid
//-------------------------------------
var plants = new Raid;


//Creamos iniciamos el objeto plants con valores
//---------------------------------------------
plants[0] = 'brocoli';
plants[1] = 'cauliflower';
plants[2] = 'cabagge';
plants[3] = 'kale';
plants[4] = 'tomato';
plants.length = 5


//Aquí instanciamos a las funciones
//----------------------------------------
console.log(plants)
var popElement = plants.pop()
console.log(plants)
console.log(popElement);