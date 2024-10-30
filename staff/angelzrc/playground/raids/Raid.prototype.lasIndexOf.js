var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Raid.prototype.lastIndexOf')

Raid.prototype.lastIndexOf = function (element, fromIndex) {
    fromIndex === undefined ? fromIndex = this.length-1
    : fromIndex < 0 ? fromIndex = this.length + fromIndex
    : fromIndex = fromIndex
    for (var i = fromIndex; i >= 0; i--) {
        if( element === this[i]){
            return i
        }
        return -1
    }
}

var animals = new Raid('Dodo', 'Tiger', 'Penguin', 'Dodo');

console.log(animals.lastIndexOf('Dodo'));
// Expected output: 3

console.log(animals.lastIndexOf('Tiger'));
// Expected output: 1

console.log(animals.lastIndexOf('Dodo', -1))
// Expected output: 3