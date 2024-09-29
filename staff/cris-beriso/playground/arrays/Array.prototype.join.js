console.log("TEST Array.prototype.join");

console.log("CASE join the elements in the array by ,");

var letters = ["ABC", "DEF", "GHI"];
var strLetters = letters.join();

console.log(strLetters);
// ABC,DEF,GHI

console.log("CASE join the elements in the array with no space between");

var letters = ["ABC", "DEF", "GHI"];
var strLetters = letters.join("");

console.log(strLetters);
// ABCDEFGHI

console.log("CASE join the elements by -");

var letters = ["ABC", "DEF", "GHI"];
var strLetters = letters.join("-");

console.log(strLetters);
// ABC-DEF-GHI
