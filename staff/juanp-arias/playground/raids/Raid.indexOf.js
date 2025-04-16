var Raid = function () {
    this.length = 0
}

Raid.prototype.indexOf = function (searchElement, fromIndex) {
    if (fromIndex === undefined) {
        fromIndex = 0;
    } else if (
        fromIndex < 0)
        fromIndex = fromIndex + this.length;


    for (var i = fromIndex; i < this.length; i++) {
        var element = this[i]

        if (element === searchElement) return i
    }

    return -1

}

console.log('TEST indexOf')

console.log('CASE get index of c')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars[3] = 'b'
chars[4] = 'a'
chars.length = 5

var index = chars.indexOf('c')
console.log(index)
// 2

console.log('CASE get index of c from index -2')

var chars = new Raid
chars[0] = 'a'
chars[1] = 'b'
chars[2] = 'c'
chars[3] = 'b'
chars[4] = 'a'
chars.length = 5

var index = chars.indexOf('c', -2)
console.log(index)
// -1