//Creamos la función constructora Raid
//-------------------------------------

var Raid = function () {
    this.length = 0;
}


//Creamos instancias del objeto Raid
//-------------------------------------

var nums = new Raid;
nums[0] = 5;
nums[1] = 10;
nums[2] = 39;
nums.length = 3;



//Aquí debajo declaramos los métodos que hacen cosas
//--------------------------------------------------

Raid.prototype.map = function (callback) {
    var result = { length: 0 };
    for (var i = 0; i < this.length; i++) {
        result[result.length] = callback(this[i]);
        result.length++;
    }

    return result;
}

var doblarValores = function (num) {
    return num * 2;
}

var raizCuadrada = function (num) {
    return (Math.sqrt(num).toFixed(2));
}



//Aquí instanciamos a las funciones
//----------------------------------------

console.log(nums.map(doblarValores));
console.log(nums.map(raizCuadrada));