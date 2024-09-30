var Raid = function () {
    this.length = 0;
}

Raid.prototype.includes = function (searchElement) {
    for (var i = 0; i < this.length; i++) {
       if (this[i] === searchElement) return true;
    }
    return false;
}

var numbers = new Raid;
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
numbers.length = 3;

var result = numbers.includes(2);
console.log(result);

console.log("test Array.prototype.includes")

console.log("CASE find number 2 in numbers")
//const numbers = [1, 2, 3];
console.log(numbers.includes(2));
// Expected output: true

//const pets = ['cat', 'dog', 'bat'];

var pets = new Raid;
pets[0] = 'cat';
pets[1] = 'dog';
pets[2] = 'bat';
pets.length = 3;

console.log("CASE find cat in pets");
console.log(pets.includes('cat'));
// Expected output: true

console.log("CASE find cow in pets");
console.log(pets.includes('cow'));
// Expected output: false