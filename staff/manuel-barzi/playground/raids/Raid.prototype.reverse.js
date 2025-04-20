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

console.log('CASE reverses iterable of 2 elements')

var names = new Raid
names[0] = 'Peter'
names[1] = 'John'
names.length = 2
var reversed = names.reverse()
console.log(reversed)
// Raid { 0: 'John', 1: 'Peter', length: 2 }
console.log(names === reversed)
// true

console.log('CASE reverses iterable of 3 elements')

var names = new Raid
names[0] = 'Peter'
names[1] = 'John'
names[2] = 'Annita'
names.length = 3
var reversed = names.reverse()
console.log(reversed)
// Raid { 0: 'Annita', 1: 'John', 2: 'Peter', length: 3 }
console.log(names === reversed)
// true

console.log('CASE reverses iterable of 4 elements')

var names = new Raid
names[0] = 'Peter'
names[1] = 'John'
names[2] = 'Annita'
names[3] = 'Mary'
names.length = 4
var reversed = names.reverse()
console.log(reversed)
// Raid { 0: 'Mary', 1: 'Annita', 2: 'John', 3: 'Peter', length: 4 }
console.log(names === reversed)
// true

console.log('CASE reverses iterable of 5 elements')

var names = new Raid
names[0] = 'Peter'
names[1] = 'John'
names[2] = 'Annita'
names[3] = 'Mary'
names[4] = 'Oswald'
names.length = 5
var reversed = names.reverse()
console.log(reversed)
// Raid { 0: 'Oswald', 1: 'Mary', 2: 'Annita', 3: 'John', 4: 'Peter', length: 5 }
console.log(names === reversed)
// true