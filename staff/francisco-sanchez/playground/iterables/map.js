//Este es el array general que mostraremos


//Creamos un segundo array en este caso de numeros para sumarlos
var nums = { 0: 5, 1: 10, 2: 30, length: 3 }
//var result = { length: 0 }
var result2 = { length: 0 }
var operacion = 0


//aquí declaramos la función map que nos llamará recursivamente a las funciones en cuestión

var map = function (iterable, callback) {
    var result = { length: 0 }
    for (var i = 0; i < iterable.length; i++) {
        //var element = iterable[i];
        result[result.length] = callback(iterable[i]);
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


console.log('Devolvemos el resultado de las multiplicaciones:')
console.log(map(nums, doblarValores));


console.log('En este punto mostramos el resulado de las raíces cuadradas. ')
console.log(map(nums, raizCuadrada));