var Raid = function () {
  this.length = 0
}

Raid.prototype.find = function (callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i]

    var found = callback(element)

    if (found) return element
  }

  return undefined //puede ponerse o no
}
console.log('TEST Raid.prototype.find')

console.log('CASE find first greater than 10')

var nums = new Raid
nums[0] = 5
nums[1] = 12
nums[2] = 8
nums[3] = 130
nums[4] = 44
nums.length = 5
var found = nums.find(function (num) { return num > 10 });
console.log(found);
//12

console.log('CASE find tirst name with length lower than 3')

var names = new Raid
names[0] = 'Peter'
names[1] = 'Leo'
names[2] = 'Wndy'
names[3] = 'Io'
names[4] = 'Mark'
names.length = 5

var found = names.find(function (name) { return name.length < 3 })
console.log(found)
//Io

console.log('CASE find product in cart with more than 5 items')

var cart = new Raid
{
  0: { brand: 'Nike', model: 'Air Max', quantity: 2 },
  1: { brand: 'Puma', model: 'Gatopardo', quantity: 1 },
  2: { brand: 'Adidas', model: 'Black', quantity: 7 },
  3: { brand: 'Santacruz', model: 'Longborad 123', quantity: 4 },
  length: 4
}

var product = find(cart, function (product) {
  return product['quantity'] > 5
})
console.log(product);
// {brand: 'Adidas', model: 'Black', quantity: 7}

console.log('CASE find product in cart with brand cointaining z')

var cart = {
  0: { brand: 'Nike', model: 'Air Max', quantity: 2 },
  1: { brand: 'Puma', model: 'Gatopardo', quantity: 1 },
  2: { brand: 'Adidas', model: 'Black', quantity: 7 },
  3: { brand: 'Santacruz', model: 'Longborad 123', quantity: 4 },
  length: 4
}

var product = find(cart, function (product) {
  return product.brand.includes('z')
})
console.log(product);
// { brand: 'Santacruz', model: 'Longborad 123', quantity: 4 }