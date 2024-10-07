var Raid = function () {
    this.length = 0
}

Raid.prototype.push = function () {
    if (arguments.length === 1) {
        var element = arguments[0];
        this[this.length] = element;
        this.length++;
    }
    // Si se pasan múltiples argumentos
    else {
        for (var i = 0; i < arguments.length; i++) {
            var element = arguments[i];
            this[this.length] = element;
            this.length++;
        }
    }

    return element;
}

console.log('TEST Raid.prototype.push')

console.log('CASE get number at index 3 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.push(600)
console.log(num)
// // nums { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, 5: 600 length : 6}