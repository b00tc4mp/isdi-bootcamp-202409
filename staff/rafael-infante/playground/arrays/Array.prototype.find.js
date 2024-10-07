console.log('TEST Array.prototype.find')


console.log('CASE find the first element greater than 10')

var nums = [5, 12, 8, 130, 44];
var found = nums.find(function (element) { return element > 10 })
console.log(found)

console.log('CASE find first name with length lower than 3')

var names = ['Peter', 'Leo', 'Wendy', 'Io', 'Mark']
var found = names.find(function (name) { return name.length < 3 })
console.log(found)

console.log('CASE find in cart product with more than 3 items')
var cart = [
  { brand: 'Nike', model: 'Air Max', quantity: 2 },
  { brand: 'Puma', model: 'Gator', quantity: 1 },
  { brand: 'Adidas', model: 'Predator', quantity: 4 },
  { brand: 'Osiris', model: 'O-Pro', quantity: 1 }
]

var found = cart.find(function (product) { return product.quantity > 3 })
console.log(found)