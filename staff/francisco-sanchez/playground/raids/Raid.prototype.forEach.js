console.log('Hacemos las dos funciones aneriores en modo Raid (this)');

//Este es el array general que mostraremos
var chars = { 0: 'aaaa', 1: 'bbbb', 2: 'ccccc', length: 3 }



//aquí declaramos la función forEach que nos llamará la función printElement recursivamente
var forEach = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i];

        callback(element);
    }
}


//Esta es la función que realiza la operación 
var printElement = function (element) {
    console.log(element);
}


//Aquí realizamos la llamada a la función
//Y para esta llamada, le pasamos el nombre de la función como parámetro
forEach(chars, printElement);