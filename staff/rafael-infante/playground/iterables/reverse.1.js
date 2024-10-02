console.log('TEST iterables/reverse')
// change the order of the iterable in reverse
// return the reversed array
var reverse = function (iterable) {
  if (iterable.length === 2) {
    var element = iterable[1]
    iterable[1] = iterable[0]
    iterable[0] = element
    return iterable
  }
  for (var i = iterable.length - 1; i > Math.floor(iterable.length / 2); i--) {
    var element = iterable[i]
    iterable[i] = iterable[iterable.length - 1 - i]
    iterable[iterable.length - 1 - i] = element
  }
  return iterable
}

console.log('CASE reverses array of 2 elements')
var names = { 0: 'Juana', 1: 'Pedro', length: 2 }
var reversed = reverse(names)
console.log(reversed) // Expected output {0: 'Pedro', 1: 'Juana', length: 2}

console.log('CASE reverses array of 3 elements')
var names = { 0: 'Juana', 1: 'Pedro', 2: 'Anitta', length: 3 }
var reversed = reverse(names)
console.log(reversed) // Expected output {0: 'Anitta', 1: 'Pedro', 2: 'Juana', length: 3}

console.log('CASE reverse array of 4 elements')
var names = { 0: 'Juana', 1: 'Pedro', 2: 'Anitta', 3: 'Rafa', length: 4 }
var reversed2 = reverse(names)
console.log(reversed2) // Expected output {0: 'Rafa', 1: 'Anitta', 2: 'Pedro', 3: 'Juana', length: 4}