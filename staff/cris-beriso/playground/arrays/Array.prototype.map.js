console.log('TEST Array.prototype.map')

console.log('CASE return an array with the result of product x 20');

var evenNums = [2, 4, 6, 8];
var result = evenNums.map(function (num) { return num * 20 });
console.log(result);
// [40, 80, 120, 160]

console.log('CASE return an array with the result of division per 2');

var evenNums = [2, 4, 6, 8];
var result = evenNums.map(function (num) { return num / 2 });
console.log(result);
// [1, 2, 3, 4]