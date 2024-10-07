//Creamos la función constructora Raid
//-------------------------------------

var Raid = function (exaCode) {
    this.exaCode = exaCode;
    //this.desc = desc
    this.length = 0;
}


//Creamos instancias del objeto Raid
//-------------------------------------

var colores1 = new Raid;
colores1[0] = 'amarillo';
colores1[1] = 'negro';
colores1[2] = 'turquesa';
colores1[3] = 'rojo';
colores1[4] = 'naranja';
colores1.length = 5;

var colores2 = new Raid;
colores2[0] = 'verde';
colores2[1] = 'violeta';
colores2[2] = 'rosa';
colores2[3] = 'azul';
colores2[4] = 'cyan';
colores2.length = 5;

var colores3 = new Raid;
colores3[0] = 'púrpura';
colores3[1] = 'carmín';
colores3.length = 2;




//Aquí debajo declaramos los métodos que hacen cosas
//--------------------------------------------------

Raid.prototype.concat = function () {

    var result = new Raid;

    for (var k = 0; k < this.length; k++) {
        //result[result.length++] = this[k];  --> Esta linea es equivalente a las dos de abajo en un solo paso

        result[result.length] = this[k]; // Asignamos el valor de this[k] a la posición actual
        result.length++;                 // Luego incrementamos la longitud de result
    }

    for (var i = 0; i < arguments.length; i++) {

        for (var j = 0; j < arguments[i].length; j++) {

            //Always I'll concatenate the new word in the last position of the new array resultado
            result[result.length] = arguments[i][j];
            result.length++;
        }
    }

    return result;

}



//Aquí instanciamos a las funciones
//----------------------------------------

var concatenado = colores1.concat(colores2, colores3);
console.log(concatenado);