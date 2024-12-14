var Raid = function () {
  this.length = 0
}

Raid.prototype.findIndex = function (callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i]

    var found = callback(element)

    if (found) return i
  }
}

console.log('TEST Raid.prototype.findIndex')

console.log('CASE get the index of the first element greater than 10')

var nums = new Raid
nums[0] = 5
nums[1] = 12
nums[2] = 8
nums[3] = 130
nums[4] = 44
nums.length = 5
var index = nums.findIndex(function (num) { return num > 10 })
console.log(index)
// 1

console.log('CASE get the index of the first element greater than 100')

var nums = new Raid
nums[0] = 5
nums[1] = 12
nums[2] = 8
nums[3] = 130
nums[4] = 44
nums.length = 5
var index = nums.findIndex(function (num) { return num > 100 })
console.log(index)
// 3

console.log('CASE get the index of the first name with length lower than 3')

var names = new Raid
names[0] = 'Peter'
names[1] = 'Leo'
names[2] = 'Wndy'
names[3] = 'Io'
names[4] = 'Mark'
names.length = 5
var index = names.findIndex(function (name) { return name.length < 3 })
console.log(index)
// 3

console.log('CASE get the index of the product with more than 5 items')

var cart = new Raid
cart[0] = { brand: 'Nike', model: 'Air Max', quantity: 2 }
cart[1] = { brand: 'Puma', model: 'Gatopardo', quantity: 1 }
cart[2] = { brand: 'Adidas', model: 'Black', quantity: 7 }
cart[3] = { brand: 'Santacruz', model: 'Longborad 123', quantity: 4 }
cart.length = 4
var index = cart.findIndex(function (product) {
  return product['quantity'] > 5
})
console.log(index)
// 2

console.log('CASE get the index of the product with brand containing z')

var cart = new Raid
cart[0] = { brand: 'Nike', model: 'Air Max', quantity: 2 }
cart[1] = { brand: 'Puma', model: 'Gatopardo', quantity: 1 }
cart[2] = { brand: 'Adidas', model: 'Black', quantity: 7 }
cart[3] = { brand: 'Santacruz', model: 'Longborad 123', quantity: 4 }
cart.length = 4
var index = cart.findIndex(function (product) {
  return product.brand.includes('z')
})
console.log(index)
// 3