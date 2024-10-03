console.log("test Array.protoptype.push");

console.log("CASE add 400 to nums");
var nums = [100, 200, 300];
var length = nums.push(400);
console.log(nums)
//expected value added to array [100, 200, 300, 400]

console.log("CASE add banana to fruits");
var fruits = ["apple", "orange", "rasberry", "pineapple"];
var fruit = fruits.push("banana");
console.log(fruits);
//exptected updated array ["apple", "orange", "rasberry", "pineapple", "banana"]