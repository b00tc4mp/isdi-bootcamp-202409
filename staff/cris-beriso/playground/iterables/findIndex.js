var findIndex = function (iterable, callback) {
  for (var i = 0; i < iterable.length; i++) {
    var element = iterable[i]

    var found = callback(element)

    if (found) return i
  }
}

console.log('TEST findIndex')

console.log('CASE get the index of the first element greater than 10')

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }
var index = findIndex(nums, function (num) { return num > 10 })
console.log(index)
// 1

console.log('CASE get the index of the first element greater than 100')

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }
var index = findIndex(nums, function (num) { return num > 100 })
console.log(index)
// 3

console.log('CASE get the index of the first name with length lower than 3')

var names = { 0: 'Peter', 1: 'Leo', 2: 'Wendy', 3: 'Io', 4: 'Mark', length: 5 }
var index = findIndex(names, function (name) { return name.length < 3 })
console.log(index)
// 3

console.log('CASE get the index of the product with more than 5 items')

var cart = {
  0: { brand: 'Nike', model: 'Air Max', quantity: 2 },
  1: { brand: 'Puma', model: 'Gatopardo', quantity: 1 },
  2: { brand: 'Adidas', model: 'Black', quantity: 7 },
  3: { brand: 'Santacruz', model: 'Longborad 123', quantity: 4 },
  length: 4
}
var index = findIndex(cart, function (product) {
  return product['quantity'] > 5
})
console.log(index)
// 2

console.log('CASE get the index of the product with brand containing z')

var cart = {
  0: { brand: 'Nike', model: 'Air Max', quantity: 2 },
  1: { brand: 'Puma', model: 'Gatopardo', quantity: 1 },
  2: { brand: 'Adidas', model: 'Black', quantity: 7 },
  3: { brand: 'Santacruz', model: 'Longborad 123', quantity: 4 },
  length: 4
}
var index = findIndex(cart, function (product) {
  return product.brand.includes('z')
})
console.log(index)
// 3