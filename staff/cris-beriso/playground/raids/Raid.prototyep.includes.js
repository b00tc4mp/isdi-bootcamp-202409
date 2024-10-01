var Raid = function () {
    this.length = 0
}

Raid.prototype.includes = function (searchElement) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === searchElement) return true
    }
    return false
}

console.log('TEST Raid.prototype.includes');

console.log('CASE find number 2 in numbers');

var numbers = new Raid
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers.length = 3

var result = numbers.includes(2);
console.log(result);
// True

console.log('CASE find cat in pets')

var pets = new Raid
pets[0] = 'cat'
pets[1] = 'dog'
pets[2] = 'bat'
pets.length = 3

var result = pets.includes('cat');
console.log(result);
// False

console.log('CASE find cow in pets');

var pets = new Raid
pets[0] = 'cat'
pets[1] = 'dog'
pets[2] = 'bat'
pets.length = 3

var result = pets.includes('cow')
console.log(result);
// False