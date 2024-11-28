console.log(Array.prototype.find)

console.log('find first greater than 10')

var nums = [3, 7, 2, 130, 9]
var found = nums.find(function (element) { return element > 10 });
console.log(found);
//130

console.log('find first greater than 3')

var names = ['Pablo', 'Lau', 'Paco', 'Io', 'Marcus']
var found = names.find(function (name) { return name.length < 3 }) //no cuenta el último num(o sea, 2, no 3)
console.log(found)
//Io


console.log('find product in cart w more than 5 items')

var cart = [
    { brand: 'Apple', model: 'iPhone 15 pro', quantity: 4 },
    { brand: 'Samsung', model: 'Pantallaca', quantity: 2 },
    { brand: 'Nokia', model: 'Duraso', quantity: 8 },
    { brand: 'Xiaomi', model: 'Ni idea5', quantity: 7 },
]

var product = cart.find(function (product) {
    return product.quantity > 5
})

console.log(product)
//{ brand: 'Nokia', model 'Duraso', quantity: 8 }, porq es mayor que 5 y es el primero que se encuentra