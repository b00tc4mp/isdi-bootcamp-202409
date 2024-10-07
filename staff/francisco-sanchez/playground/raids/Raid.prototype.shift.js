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

RaidBarcos.prototype.shift = function () {
    var shiftedWord = this[0];

    delete this[0];
    this.length--;

    for (i = 1; i <= this.length; i++) {
        this[i - 1] = this[i];
    }

    delete this[this.length];

    return shiftedWord;

}

//Aquí instanciamos a las funciones
//---------------------------------

console.log("Barcos antes de shift tiene este aspecto:\n")
console.log(barcos);


console.log("La palabra eliminada es: " + barcos.shift());

console.log("\nBarcos después de shift tiene este aspecto:\n")
console.log(barcos);
