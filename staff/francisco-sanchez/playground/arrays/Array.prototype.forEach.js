console.log("TEST Array.prototype.forEach");

console.log("CASE print characters in array");
console.log('---------------------------');

var chars = ['aaa', 'bbb', 'ccc'];

// chars.forEach(function (element) { console.log(element) })
// Expected output: "a"
// Expected output: "b"
// Expected output: "c"


//Creamos la función callback para el forEach
var printElement = function (element) {
    console.log(element
    )
};

//En este punto llamamos a forEach con el array chars
chars.forEach(printElement);
//Devolverá los elementos que contiene. 



console.log('CASE sum numbers from array')
console.log('---------------------------')

var nums = [100, 200, 300];
var result = 0;

nums.forEach(function (num) {
    result += num;
});

console.log(result)