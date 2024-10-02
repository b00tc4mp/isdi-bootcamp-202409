var Raid = function () {
    this.element = 0
}

Raid.prototype.slice = function (start, end) {
    var result = { length: 0 };
    if (arguments.length === 0) start = 0;
    var startIndex = (start >= 0 ? start : (this.length + start))
    var endIndex = (end > 0 ? end : end < 0 ? end + this.length : this.length);
    for (var i = startIndex; i < endIndex; i++) {
        result[result.length] = this[i];
        result.length++;
    }
    return result;
}

console.log('TEST Raid.prototype.slice')

console.log('CASE copy the object from index 2')

var animals = new Raid
animals[0] = 'ant'
animals[1] = 'bison'
animals[2] = 'camel'
animals[3] = 'duck'
animals[4] = 'elephant'
animals.length = 5

console.log(animals.slice(2));
// Raid { 0: 'camel', 1: 'duck', 2: 'elephant', length: 3 }

console.log('CASE copy from index 2 to 4');

console.log(animals.slice(2, 4));
// Raid { 0: 'camel', 1: 'duck', length: 2}

console.log('CASE copy from index -2');

console.log(animals.slice(-2));
// Raid { 0: 'duck', 1: 'elephant', length: 2}

console.log('CASE copy from index 2 to index -1');

console.log(animals.slice(2, -1));
// Raid { 0: 'camel', 1: 'duck', length: 2}

console.log('CASE copy without parameters')

console.log(animals.slice());
// Raid { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'elephant', length: 5 }