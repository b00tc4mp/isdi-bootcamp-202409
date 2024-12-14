console.log('TEST Array.prototype.findIndex')

console.log('CASE get the index of the first element greater than 10')

var nums = [5, 12, 8, 130, 44]
var index = nums.findIndex(function (num) { return num > 10 })
console.log(index)
// 1

console.log('CASE get the index of the first element greater than 100')

var nums = [5, 12, 8, 130, 44]
var index = nums.findIndex(function (num) { return num > 100 })
console.log(index)
// 3

console.log('CASE get the index of the first name with length lower than 3')

var names = ['Peter', 'Leo', 'Wendy', 'Io', 'Mark']
var index = names.findIndex(function (name) { return name.length < 3 })
console.log(index)
// 3

console.log('CASE get the index of the product with more than 5 items')

var cart = [
  { brand: 'Nike', model: 'Air Max', quantity: 2 },
  { brand: 'Puma', model: 'Gatopardo', quantity: 1 },
  { brand: 'Adidas', model: 'Black', quantity: 7 },
  { brand: 'Santacruz', model: 'Longborad 123', quantity: 4 },
]
var index = cart.findIndex(function (product) {
  return product['quantity'] > 5
})
console.log(index)
// 2

console.log('CASE get the index of the product with brand cointaining z')

var cart = [
  { brand: 'Nike', model: 'Air Max', quantity: 2 },
  { brand: 'Puma', model: 'Gatopardo', quantity: 1 },
  { brand: 'Adidas', model: 'Black', quantity: 7 },
  { brand: 'Santacruz', model: 'Longborad 123', quantity: 4 },
]
var index = cart.findIndex(function (product) {
  return product.brand.includes('z')
})
console.log(index)
// 3