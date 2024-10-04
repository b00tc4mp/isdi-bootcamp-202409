var Raid = function () {
    this.length = 0;
}

Raid.prototype.copyWithin = function (target, start, end) {
    var endIndex = (end === undefined ? this.length : end);
    var targetIndex = target
    for (var i = start; i < endIndex; i++) {
        this[targetIndex] = this[i];
        targetIndex++;
    }
    return this;
}

console.log('TEST Raid.prototype.copyWithin');

console.log('CASE copy to index 0 the element at index 3');

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars[3] = 'd'
chars[4] = 'e'
chars.length = 5

console.log(chars.copyWithin(0, 3, 4));
// Raid { 0: 'd', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }

console.log('CASE copy to index 1 all elements from index 3 to the end')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars[3] = 'd'
chars[4] = 'e'
chars.length = 5

console.log(chars.copyWithin(1, 3));
// Raid { 0: 'a', 1: 'd', 2: 'e', 3: 'd', 4: 'e', length: 5 }