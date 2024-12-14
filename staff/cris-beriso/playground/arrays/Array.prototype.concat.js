console.log("TEST Array.prototype.concat")

console.log("CASE concat two arrays")

var firstArr = ["a", "b", "c"]
var secondArr = ["d", "e", "f"]

var concatArr = firstArr.concat(secondArr);
console.log(concatArr)
// ["a", "b", "c", "d", "e", "f"]

console.log("CASE concat three arrays")
var firstArr = ["a", "b", "c"]
var secondArr = ["d", "e", "f"]
var thirdArr = ["g", "h", "i"]

var concatArr = firstArr.concat(secondArr, thirdArr)
console.log(concatArr)
// ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

console.log("CASE concat values to an array")
var arr = ["a", "b", "c"]

var concatArr = arr.concat(1, [2, 3]);
console.log(concatArr)
// ["a", "b", "c", 1, 2, 3]