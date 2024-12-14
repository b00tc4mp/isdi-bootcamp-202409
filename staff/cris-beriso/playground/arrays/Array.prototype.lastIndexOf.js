console.log("TEST Array.prototype.lastIndexOf")

console.log("CASE get last index of 'a'")

var chars = ["a", "b", "c", "a", "d"]

var lastIndex = chars.lastIndexOf("a");
console.log(lastIndex);
// 3

console.log("CASE get last index of 'a' from index 2")

var chars = ["a", "b", "c", "a", "d"]

var lastIndex = chars.lastIndexOf("a", 2)
console.log(lastIndex);
// 0

console.log("CASE get last index of 'a' from index -3")
var lastIndex = chars.lastIndexOf("a", -3)
console.log(lastIndex);
// 0

console.log("CASE index of 'd' from -2 not found")
var lastIndex = chars.lastIndexOf("d", -2)
console.log(lastIndex);
// -1