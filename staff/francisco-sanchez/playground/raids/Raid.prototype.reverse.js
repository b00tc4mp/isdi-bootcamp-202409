//NOTA VIP: 
//Este no está terminado


//Creamos la función constructora Raid
//-------------------------------------


var RaidAnimal = function (nombre, tipo, raza, edad, peso) {
    this.nombre = nombre
    this.tipo = tipo
    this.raza = raza
    this.edad = edad
    this.peso = peso
}


//Creamos instancias del objeto Raid
//-------------------------------------

var dante = new RaidAnimal('Dante', 'gato', 'Persa', '3', '5kg');
var kiara = new RaidAnimal('Kiara', 'perro', 'Pastor aleman', '14', '35kg');
var risto = new RaidAnimal('Risto', 'gato', 'Europeo', '4', '4,5kg');
var romero = new RaidAnimal('Romero', 'caballo', 'frison', '9', '600kg');

/*
var animales = [dante, kiara, risto, romero]
console.log(Animales)
*/

var raidAnimales = { length: 0 };
raidAnimales[0] = dante;
raidAnimales[1] = kiara;
raidAnimales[2] = risto;
raidAnimales[3] = romero;
raidAnimales.length = 4;

console.log(raidAnimales)


//Aquí debajo declaramos los métodos que hacen cosas
//--------------------------------------------------


RaidAnimal.prototype.reverse = function () {


}


var reverse = function (iterable) {

    var result = { length: 0 };

    for (var i = iterable.length; i >= 0; i--) {

        result[result.length] = iterable[i - 1];

        result.length += 1;
    }

    animales = result;
    return animales;
}

console.log(reverse(raidAnimales))