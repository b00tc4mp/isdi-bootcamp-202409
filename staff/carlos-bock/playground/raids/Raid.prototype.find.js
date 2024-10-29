var Raid = function() {
    this.length = 0;
};
Raid.prototype.find = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        var found = callback(element);
        if (found) return element;
    }
}

console.log('TEST Raid.prototype.find');
console.log('CASE find first greater than 10');
var obj = new Raid;
obj['0'] = 5;
obj['1'] = 12;
obj['2'] = 8;
obj['3'] = 130;
obj['4'] = 44;
obj.length = 5;
var result = obj.find(function (num) { return num > 10 });
console.log(result);
//expect 12 as output



console.log('CASE find product in cart with more than 5 items')
var obj2 = new Raid
obj2[0] = { brand: 'Nike', model: 'Air Max', quantity: 2 };
obj2[1] = { brand: 'Puma', model: 'Gatopardo', quantity: 1 };
obj2[2] = { brand: 'Adidas', model: 'Black', quantity: 7 };
obj2[3] = { brand: 'Santacruz', model: 'Longboard 123', quantity: 4 };
obj2.length = 4;
var product = obj2.find(function (product) {
    return product.quantity > 5;
})
// exptect obj2[3]