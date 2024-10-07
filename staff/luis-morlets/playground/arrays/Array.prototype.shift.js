console.log('TEST Array.prototype.shift.js')

console.log('CASE extract first element in nums')

var nums = [100, 200, 300];

var firstElement = nums.shift();

console.log(nums

);
// Expected output: Array [200, 300]

console.log(firstElement);
// Expected output: 100


console.log('CASE extract first element in names')

var names = ['jose', 'juan', 'manuel', 'miguel'];

var firstElement = names.shift();

console.log(names);
// Expected output: ['juan', 'manuel', 'miguel']

console.log(firstElement);
// Expected output: jose