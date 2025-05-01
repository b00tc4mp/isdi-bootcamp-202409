console.log('TEST Array.prototype.at')

console.log('CASE buscar el indice')

var nums = [100, 200, 300, 400, 500];
var index = nums.at(2);

console.log(nums);
// [100, 200, 300, 400 ,500 ] (5)
console.log(index);
// 300


index = nums.at(-1)

console.log(nums);
// [100, 200, 300, 400 ,500 ] (5)
console.log(index);
// 300