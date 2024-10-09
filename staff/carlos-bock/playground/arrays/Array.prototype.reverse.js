
console.log('TEST Array.prototype.reverse');
console.log('CASE reverses array of 2 elements');
var nums = [3,2,1];
var reversed = nums.reverse();
console.log(reversed);
// [3,2,1]
console.log(names === reversed);
// true

console.log('CASE reverses array of 3 elements');
var letters = ['a', 'b', 'c'];
var reversed = letters.reverse();
console.log(reversed);
// ['c', 'b', 'a']
console.log(letters === reversed);
// true

console.log('CASE reverses array of 4 elements');
var bools = [true, true, true, false];
var reversed = bools.reverse();
console.log(reversed)
// [false, true, true, true]
console.log(names === reversed);
// true