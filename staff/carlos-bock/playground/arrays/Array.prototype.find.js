console.log('TEST Array.prototype.find');
console.log('CASE find first greater than 10');

var nums = [5, 12, 8, 130, 44];
var found = nums.find(function (num) { return num > 10 });
console.log(found);
//expect 12

console.log('CASE find first greater than 100');
var nums = [5, 12, 8, 130, 44];
var found = nums.find(function (num) { return num > 100 });
console.log(found);
//expect 130

console.log('CASE find first name with length lower than 3');
var names = ['Peter', 'Leo', 'Wendy', 'Io', 'Mark'];
var found = names.find(function (name) { return name.length < 3 });
console.log(found);
//expted Io

console.log('CASE find product in cart with more than 5 items');
var cart = [
    { brand: 'Nike', model: 'Air Max', quantity: 2 },
    { brand: 'Puma', model: 'Gatopardo', quantity: 1 },
    { brand: 'Adidas', model: 'Black', quantity: 7 },
    { brand: 'Santacruz', model: 'Longboard 123', quantity: 4 }
];

var product = cart.find(function (product) {
    return product.quantity > 5;
})

console.log(product);
// { brand: 'Adidas', model: 'Black', quantity: 7 }

console.log('CASE find product in cart with brand containing z')
var cart = [
    { brand: 'Nike', model: 'Air Max', quantity: 2 },
    { brand: 'Puma', model: 'Gatopardo', quantity: 1 },
    { brand: 'Adidas', model: 'Black', quantity: 7 },
    { brand: 'Santacruz', model: 'Longboard 123', quantity: 4 }
];

var product = cart.find(function (product) {
    return product.brand.includes('z')
});
console.log(product);
// exptect { brand: 'Santacruz', model: 'Longboard 123', quantity: 4 }