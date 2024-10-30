var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Array.prototype.includes')

Raid.prototype.includes = function(element, fromIndex) {
    fromIndex === undefined ? fromIndex = 0 : fromIndex < 0 ? fromIndex = this.length + fromIndex: fromIndex = fromIndex

    for (var i = fromIndex; i < this.length; i++){
        if( this[i] === element){
            return true
        }
    }
    return false
}
var array1 = new Raid(1, 2, 3);

console.log(array1.includes(2));
// Expected output: true

var pets = new Raid('cat', 'dog', 'bat');

console.log(pets.includes('cat'));
// Expected output: true

console.log(pets.includes('at'));
// Expected output: false

console.log(pets.includes('cat', 1));
// Expected output: false

console.log(pets.includes('bat', 1));
// Expected output: true

console.log(pets.includes('dog', -1));
// Expected output: false