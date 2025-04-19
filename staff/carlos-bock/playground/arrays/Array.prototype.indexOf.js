console.log('TEST Array.prototype.indexOf');

console.log('CASE get index of c');

var chars = ['a', 'b', 'c', 'd', 'd','a'];
var letter = chars.indexOf('c');
console.log(letter);
//Expected value 2

var nums = [1,2,3,4,5,6];
var num = nums.indexOf(24);
console.log(num);
//Exptected value -1

var boolean = [false,false, false, true];
var bool = boolean.indexOf(true);
console.log(bool);
//Exptected value 3