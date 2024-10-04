var join = function (iterable, separator) {

    var finalStr = iterable.length === 0 ? "" : iterable[0];
    var separator2 = separator === undefined ? "," : separator;

    for (var i = 1; i < iterable["length"]; i++) {
        finalStr += separator2 + iterable[i];
    }
    return finalStr;
}
console.log("TEST join");

console.log("CASE join the elements by ,");

var letters = { 0: "ABC", 1: "DEF", 2: "GHI", length: 3 };
var strLetters = join(letters);

console.log(strLetters);
// ABC,DEF,GHI

console.log("CASE join the elements whit no space between");

var letters = { 0: "ABC", 1: "DEF", 2: "GHI", length: 3 };
var strLetters = join(letters, "");

console.log(strLetters)
// ABCDEFGHI

console.log("CASE join the elements by -")

var letters = { 0: "ABC", 1: "DEF", 2: "GHI", length: 3 };
var strLetters = join(letters, "-");

console.log(strLetters);
// ABC-DEF-GHI
