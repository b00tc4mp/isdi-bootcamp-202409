console.log('Hacemos las dos funciones aneriores en modo Raid (this)');

var Raid = function () {
    this.length = 0;
}

var chars = new Raid;
chars[0] = 'aaa';
chars[1] = 'bbb';
chars[2] = 'ccc';
chars.length = 3;

var nums = new Raid;
nums[0] = 100;
nums[1] = 200;
nums[2] = 300;
nums.length = 3;

var result = 0;


//--------------------------------------

Raid.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        callback(element);
    }
}



//Aquí instanciamos a las funciones
//----------------------------------------


//Esta es la función que realiza la operación 
var printElement = function (element) {
    console.log(element);
}



var sumaNums = function (element) {
    result += element;
}



//Aquí realizamos la llamada a la función
//Y para esta llamada, le pasamos el nombre de la función como parámetro
chars.forEach(printElement);
nums.forEach(sumaNums);
console.log(result);