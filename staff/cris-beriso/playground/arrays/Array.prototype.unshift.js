console.log("TEST Array.prototype.unshift");

console.log("CASE add 400 at the beggining of nums");

var nums = [100, 200, 300];
var length = nums.unshift(400);

console.log(nums);
// (5) [400, 100, 200, 300]
console.log(length);
// 4

console.log("CASE add banana at the begginig of fruits");

var fruits = ["apple", "orange", "raspberry", "pineaple"];
var length = fruits.unshift("banana");

console.log(fruits);
// (5) ["banana", "apple", "orange", "raspberry", "pineaple"]
console.log(length);
// 5

console.log("CASE add banana pear and coconut to fruits");

var fruits = ["apple", "orange", "raspberry", "pineaple"];
var length = fruits.unshift("banana", "pear", "coconut");

console.log(fruits);
// (7) ["banana", "pear", "coconut", "apple", "orange", "raspberry", "pineaple"]
console.log(length);
// 7