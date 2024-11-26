var Raid = function () {
    this.length = 0
}

Raid.prototype.map = function (callback) {
    var object = { length: 0 }

    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        //llamo al callback y almaceno el elemento devuelto
        var newValue = callback(element)

        object[object.length] = newValue
        object.length++
    }
    return object
}
console.log('TEST Raid.prototype.map')

console.log('CASE multiply *2 nums array')

var nums = new Raid
nums[0] = 1
nums[1] = 4
nums[2] = 9
nums[3] = 16
nums.length = 4

var map1 = function (element) {
    return element * 2
};

var final = nums.map(map1)
console.log(final)
// { 0: 2, 1: 8, 2: 18, 3: 32, length: 4 }