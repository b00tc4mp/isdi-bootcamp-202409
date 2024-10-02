var Raid = function () {
    this.length = 0
};

Raid.prototype.map = function (callback) {
    var result = { length: 0 }
    for (var i = 0; i < this.length; i++) {
        result[i] = callback(this[i]);
        result.length++
    }
    return result;
}

console.log('TEST Raid.prototype.map');

console.log('CASE return a raid with the result of product each number per 20');

var evenNums = new Raid
evenNums[0] = 2
evenNums[1] = 4
evenNums[2] = 6
evenNums[3] = 8
evenNums.length = 4

var product = function (num) {
    return num * 20;
}

var result = evenNums.map(product);
console.log(result);
// Raid { 0: 40, 1: 80, 2: 120, 3: 160, length: 4 }

console.log('CASE return a raid with the result of divide each number per 2')

var evenNums = new Raid
evenNums[0] = 2
evenNums[1] = 4
evenNums[2] = 6
evenNums[3] = 8
evenNums.length = 4

var result = evenNums.map(function (num) { return num / 2 });
console.log(result);