var find = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++) {
        var element = iterable[i]
        var found = callback(element)
        if (found) return element
    }
    //return undefined
}
console.log('TEST find')
console.log('CASE find first greater than 10')
var nums = { '0': 5, '1': 12, '2': 8, '3': 130, '4': 44, 'length': 5 }
var found = find(nums, function (num) { return num > 10 });
console.log(found);
// 12
console.log('CASE find first greater than 100')
var nums = { '0': 5, '1': 12, '2': 8, '3': 130, '4': 44, 'length': 5 }
var found = find(nums, function (num) { return num > 100 });
console.log(found);
// 130
console.log('CASE find first name with length lower than 3')
var names = { 0: 'Peter', 1: 'Leo', 2: 'Wendy', 3: 'Io', 4: 'Mark', length: 5 }
var found = find(names, function (name) { return name.length < 3 })
console.log(found)
// Io
console.log('CASE find product in cart with more than 5 items')
var cart = {
    0: { brand: 'Nike', model: 'Air Max', quantity: 2 },
    1: { brand: 'Puma', model: 'Gatopardo', quantity: 1 },
    2: { brand: 'Adidas', model: 'Black', quantity: 7 },
    3: { brand: 'Santacruz', model: 'Longboard 123', quantity: 4 },
    length: 4
}
var product = find(cart, function (product) {
    //return product['quantity'] > 5
    return product.quantity > 5
})
console.log(product)
// { brand: 'Adidas', model: 'Black', quantity: 7 }
console.log('CASE find product in cart with brand containing z')
var cart = {
    0: { brand: 'Nike', model: 'Air Max', quantity: 2 },
    1: { brand: 'Puma', model: 'Gatopardo', quantity: 1 },
    2: { brand: 'Adidas', model: 'Black', quantity: 7 },
    3: { brand: 'Santacruz', model: 'Longboard 123', quantity: 4 },
    length: 4
}
var product = find(cart, function (product) {
    return product.brand.includes('z')
})
console.log(product)