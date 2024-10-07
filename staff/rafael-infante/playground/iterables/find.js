console.log('TEST iterable/find')

var find = function (iterable, callback) {
  for (var i = 0; i < iterable.length; i++) {
    var element = iterable[i]
    var found = callback(element)
    if (found) return element
  }
  return undefined
}


console.log('CASE find the first element greater than 10')

var nums = { '0': 5, '1': 12, '2': 8, '3': 130, '4': 44, length: 5 }

var found = find(nums, function (element) { return element > 10 })
console.log(found)

console.log('CASE find first name with length lower than 3')

var names = { 0: 'Peter', 1: 'Leo', 2: 'Wendy', 3: 'Io', 4: 'Mark', length: 4 }
var found = find(names, function (element) { return element.length < 3 })
console.log(found)

console.log('CASE find brand in cart containing O')
var cart = {
  0: { brand: 'Nike', model: 'Air Max', quantity: 2 },
  1: { brand: 'Puma', model: 'Gator', quantity: 1 },
  2: { brand: 'Adidas', model: 'Predator', quantity: 4 },
  3: { brand: 'Osiris', model: 'O-Pro', quantity: 1 },
  length: 4
}
var found = find(cart, function (product) { return product.brand.includes('O') })
console.log(found)