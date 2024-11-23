console.log('TEST Raid.prototype.join')

var Raid = function () {
  this.length = 0
}

Raid.prototype.join = function (separator) {
  var newString = ''
  if (separator === undefined) {
    separator = ','
  }
  for (let i = 0; i < this.length; i++) {
    i === 0 ? newString += this[i]
      : newString += separator + this[i]
  }
  return newString
}

var elements = new Raid
elements[0] = 'Fire'
elements[1] = 'Air'
elements[2] = 'Water'
elements.length = 3

console.log('CASE with no separator')
var str = elements.join()
console.log(str)

console.log('CASE with separator "-"')
var str2 = elements.join('-')
console.log(str2)

console.log('CASE array with only one item')
var element = new Raid
elements[0] = 'Fire'
elements.length = 1
var str3 = elements.join()
console.log(str3)