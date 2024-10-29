var find = function (iterable, callback) {
    for (var i = 0; i < iterable.length; i++ ) {
        var element = iterable[i];
        var found = callback(element);
        if (found) return element;
    }
}

console.log('TEST find');

console.log('CASE Find the 1st element > 10');
var nums = { '0': 5, '1': 12, '2': 8, '3': 130, '4': 44, 'length': 5 }
var found = find(nums, function (num) { return num > 10 });
console.log(found);
//expect 12

console.log('CASE find first greater than 100')
var obj1 = { '0': 5, '1': 12, '2': 8, '3': 130, '4': 44, 'length': 5 }
var result1 = find(nums, function (num) { return num > 100 });
console.log(result1);
// expect 130

console.log('CASE find product in cart with brand containing z')
var obj2 = {
    0: { brand: 'Nike', model: 'Air Max', quantity: 2 },
    1: { brand: 'Puma', model: 'Gatopardo', quantity: 1 },
    2: { brand: 'Adidas', model: 'Black', quantity: 7 },
    3: { brand: 'Santacruz', model: 'Longboard 123', quantity: 4 },
    length: 4
};
var result2 = find(obj2, function (product) {
    return product.brand.includes('z')
});
console.log(result2);
// { brand: 'Santacruz', model: 'Longboard 123', quantity: 4 }