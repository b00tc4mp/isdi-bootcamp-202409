//Este es el array general que mostraremos
var chars = { 0: 'aaaa', 1: 'bbbb', 2: 'ccccc', length: 3 }

//Creamos un segundo array en este caso de numeros para sumarlos
var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var result = 0;

//----------------------------------------------------------//

//aquí declaramos la función forEach que nos llamará la función printElement recursivamente
var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i];

        callback(element);
    }
}



//----------------------------------------------------------//

//Esta es la función que realiza la operación 
var printElement = function (element) {
    console.log(element);
}

var sumaNums = function (num) {
    result += num;
}


//Aquí realizamos la llamada a la función
//Y para esta llamada, le pasamos el nombre de la función como parámetro
forEach(chars, printElement);


//Llamada a la función forEach con los numeros para sumar
forEach(nums, sumaNums);
console.log(result);
