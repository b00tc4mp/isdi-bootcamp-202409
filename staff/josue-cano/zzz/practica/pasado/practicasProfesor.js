var nums = [100,200,300,400,500];

// var nums = {
//     0:100,
//     1:200,
//     2:300,
//     3:400,
//     4:500,
//     length:5
// }

//para objetos;
// var printNumbers = function(numbers) {
//     for (let i in numbers) {
//         console.log(numbers[i]);
//     }
// }

var printNumbers = function(numbers) {
    for (var i = 0; i < numbers.length; i++) {
        console.log(numbers[i]);
    }
}
printNumbers(nums);

// -----------------------segundo ejemplo de practica subir al objeto-----------------------------------

var nums = {
    0:100,
   1:200,
   2:300,
   3:400,
   length:4
   }

// creamos la funcion para subir elementos al objeto creando la funcion push
var push = function(iterable, element){
    iterable[iterable.length] = element
    iterable.length++}

//aqui podemos subir la informacion
    push(nums,500)