console.log('TEST Array.prototype.every')

console.log('CASE 1')
var nums = [1, 30, 39, 29, 10, 13];

var condition = function(num){
    return num < 40;
}
var condition2 = function(num){
    return num > 40   
}

var result = nums.every(condition)
console.log(result);
// true

var result2 = nums.every(condition2)
console.log(result2);
//false