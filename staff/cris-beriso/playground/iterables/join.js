var join = function (iterable, separator) {

    var finalStr = "";
    if (separator === undefined) separator = ",";
    for (var i = 0; i < iterable["length"]; i++) {
        i === 0 ? finalStr += iterable[i]
            : finalStr += separator + iterable[i];
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
