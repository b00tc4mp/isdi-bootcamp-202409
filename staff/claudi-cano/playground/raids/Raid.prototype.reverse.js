var Raid = function () { this.length = 0 }

Raid.prototype.reverse = function () {
    for (var i = 0; i < Math.floor(this.length / 2); i++) {
        var element = this[i]
        this[i] = this[this.length - 1 - i]
        this[this.length - 1 - i] = element
    }
    return this
}



console.log('TEST reverse')

console.log('CASE reverses array of 2 elements')

var names = new Raid