var Raid = function () {
    this.length = 0;
}

Raid.prototype.includes = function (searchElement) {
    for (var i = 0; i < this.length; i++) {
       if (this[i] === searchElement) return true;
    }
    return false;
}

console.log("TEST Raid.prototype.includes");

console.log("CASE find number 2 in numbers");


var numbers = new Raid;
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
numbers.length = 3;

var result = numbers.includes(2);
console.log(result);  //expect true

console.log("test .prototype.includes")


console.log("CASE find cat in pets");

var pets = new Raid;
pets[0] = 'cat';
pets[1] = 'dog';
pets[2] = 'bat';
pets.length = 3;

var result1  = pets.includes("cat");
console.log(result1); // expected result true

console.log("CASE find cow in pets");
var result2 = pets.includes("cow");
console.log(result2);
// Expected output: false