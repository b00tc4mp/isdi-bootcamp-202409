var Raid = function () {
    this.length = 0
}

Raid.prototype.join = function (separator) {
    var finalStr = this.length === 0 ? "" : this[0];
    var separator2 = separator === undefined ? "," : separator;

    for (var i = 1; i < this.length; i++) {
        finalStr += separator2 + this[i]
    }
    return finalStr
}

console.log("TEST Raid.prototype.join");

console.log("CASE join the elements by ,");

var letters = new Raid
letters[0] = 'ABC'
letters[1] = 'DEF'
letters[2] = 'GHI'
letters.length = 3
var strLetters = letters.join();
console.log(strLetters);
// ABC,DEF,GHI

console.log("CASE join the elements with no space between")

var letters = new Raid
letters[0] = 'ABC'
letters[1] = 'DEF'
letters[2] = 'GHI'
letters.length = 3
var strLetters = letters.join("");
console.log(strLetters);
// ABCDEFGHI

console.log("CASE join the elements by -")
var letters = new Raid
letters[0] = 'ABC'
letters[1] = 'DEF'
letters[2] = 'GHI'
letters.length = 3
var strLetters = letters.join("-");

console.log(strLetters);
// ABC-DEF-GHI
