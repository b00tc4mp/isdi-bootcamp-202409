var Raid = function () {
    this.length = 0
}


Raid.prototype.shift = function () {
    /*
    iterable CASE1 -> { 0: 100, 1: 200, 2: 300, length: 3};
    iterable CASE2 -> { 0: 'jose', 1: 'juan', 2: 'manuel', 3: 'miguel', length: 4 };

    extract first element on iterable
    iterable CASE1 -> { 1: 200, 2: 300, length: 3};
    iterable CASE2 -> { 1: 'juan', 2: 'manuel', 3: 'miguel', length: 4 };

    adjust iterable length
    iterable CASE1 -> { 0: 200, 1: 300, length: 2};
    iterable CASE2 -> { 0: 'juan', 1: 'manuel', 2: 'miguel', length: 3 };

    return element for each case
    */
    var element = this[0]
    delete this[0]

    for (var i = 1; i < this.length; i++) {
        this[i - 1] = this[i]
    }
    this.length--
    delete this[this.length]
    return element
}


console.log('TEST Raid.prototype.shift')

console.log('CASE extract first element in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums.length = 3

var firstElement = nums.shift();

console.log(nums);
// Expected output: { 0: 200, 1: 300, length: 2 }

console.log(firstElement);
// Expected output: 100


console.log('CASE extract first element in names')

var names = new Raid
names[0] = 'jose'
names[1] = 'juan'
names[2] = 'manuel'
names[3] = 'miguel'
names.length = 4

var firstElement = names.shift();

console.log(names);
// Expected output: { 0: 'juan', 1: 'manuel', 2:'miguel', length: 3 }

console.log(firstElement);
// Expected output: jose