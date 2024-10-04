//El método reverse() invierte el orden de los elementos de un array in place. El primer elemento pasa a ser el último y el último pasa a ser el primero.

console.log('TEST Array.prototype.reverse')


var nums = [100, 200, 300];
console.log(nums);
// [100, 200, 300]


console.log('Revertir los elementos en nums')
var reversed = nums.reverse();
console.log(reversed);
// [300, 200, 100]


