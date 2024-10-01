var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}


console.log('TEST Raid.prototype.indexOf')

Raid.prototype.indexOf = function(element, fromIndex) {
    fromIndex === undefined ? fromIndex = 0
    : fromIndex < 0 ? fromIndex= this.length + fromIndex
    : fromIndex = fromIndex

    for ( var i = fromIndex; i < this.length; i++) {
        if(this[i] === element) {
    return i
        } 
    }
    return -1
}

var beasts = new Raid('ant', 'bison', 'camel', 'duck', 'bison');

console.log(beasts.indexOf('bison'));
// Expected output: 1

// Start from index 2
console.log(beasts.indexOf('bison', 2));
// Expected output: 4

console.log(beasts.indexOf('giraffe'));
// Expected output: -1

console.log(beasts.indexOf('bison', 1));