console.log('TEST Array.prototype.reverse')

console.log('CASE reverses array of 2 elements')

var names = ['Peter', 'John']
var reversed = names.reverse()
console.log(reversed)
// [John, Peter]
console.log(names === reversed)
// true

console.log('CASE reverses array of 3 elements')

var names = ['Peter', 'John', 'Annita']
var reversed = names.reverse()
console.log(reversed)
// [Annita, John, Peter]
console.log(names === reversed)
// true

console.log('CASE reverses array of 4 elements')

var names = ['Peter', 'John', 'Annita', 'Mary']
var reversed = names.reverse()
console.log(reversed)
// [Mary, Annita, John, Peter]
console.log(names === reversed)
// true