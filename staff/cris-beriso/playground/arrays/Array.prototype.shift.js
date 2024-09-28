console.log("TEST Array.prototype.shift");

console.log("CASE extract red from colors");

var colors = ["red", "green", "blue", "yellow"];
var color = colors.shift();

console.log(colors);
// ["green", "blue", "yellow"]
console.log(color);
// red

console.log("CASE extract 100 from nums");

var nums = [100, 200, 300, 400];
var num = nums.shift();

console.log(nums);
// [200, 300, 400]
console.log(num);
// 100
