console.log('TEST Iterable/join')
var join = function (iterable, separator) {
  var newString = ''
  if (separator === undefined) {
    separator = ','
  }
  for (let i = 0; i < iterable.length; i++) {
    i === 0 ? newString += iterable[i]
      : newString += separator + iterable[i]
  }
  return newString
}

var elements = { 0: 'Fire', 1: 'Air', 2: 'Water', length: 3 }

console.log(elements)

console.log('CASE with no separator')

var str = join(elements)
console.log(str);
//"Fire,Air,Water"

console.log('CASE with separator "-"')

var str1 = join(elements, '-')
console.log(str1);
//"Fire-Air-Water"

console.log('CASE array with only one item')
var element = { 0: 'Fire', length: 1 }
var str2 = join(element)
console.log(str2)