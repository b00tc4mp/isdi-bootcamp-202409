var Raid = function () {
    this.length = 0
}

Raid.prototype.filter = function (callback) {
    var object = { length: 0 }

    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        //llamo al callback y almaceno el elemento devuelto
        callback(element)
        if (callback(element)) {
            object[object.length] = this[i]
            object.length++
        }
    }
    return object
}
console.log('TEST Raid.prototype.filter')

console.log('CASE multiply filter >6')

var nums = new Raid
nums[0] = 'spray'
nums[1] = 'elite'
nums[2] = 'exuberant'
nums[3] = 'destruction'
nums[4] = 'present'
nums.length = 5

var map1 = function (element) {
    if (element.length > 6) {
        return element.length > 6
    }
}

var result = nums.filter(map1)
console.log(result)
// { 0: 'exuberant', 1: 'destruction', 2: 'present', length: 3 }
