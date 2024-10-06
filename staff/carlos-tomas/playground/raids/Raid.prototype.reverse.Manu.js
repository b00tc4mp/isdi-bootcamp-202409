var Raid = function () {
    this.length = 0
}

Raid.prototype.reverse = function () {
    for (var i = 0; i < Math.floor(this.length / 2); i++) {
        var element = this[i]
        this[i] = this[this.length - 1 - i]
        this[this.length - 1 - i] = element
    }
    return this
}

console.log('TEST reverse')

console.log('CASE reverses iterable of 2 elements')

var names = new Raid
names[0] = "Peter"
names[1] = "Jhon"
names[2] = "Jenny"
names[3] = "Mary"
names[4] = "Carlos"
names[5] = "Marc"
names.length = 6

var reversed = names.reverse()
console.log(reversed)
// Raid {
//     '0': 'Marc',
//     '1': 'Carlos',
//     '2': 'Mary',
//     '3': 'Jenny',
//     '4': 'Jhon',
//     '5': 'Peter',
//     length: 6
console.log(names === reversed)
// true

