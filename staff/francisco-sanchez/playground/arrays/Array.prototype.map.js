/*
El método map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.
*/

console.log("TEST Array.prototype.map");

console.log("CASE using function map()");
console.log('---------------------------');


var numbers = [1, 5, 10, 15];

var doubles = numbers.map(function (x) {
    return x * 2;
});
// doubles is now [2, 10, 20, 30]
// numbers is still [1, 5, 10, 15]

var numbers = [1, 4, 9];

var roots = numbers.map(function (num) {
    return Math.sqrt(num);
});
// roots is now [1, 2, 3]
// numbers is still [1, 4, 9]


console.log(doubles);
console.log(roots);