var Raid = function () {
    this.length = 0
}


Raid.prototype.includes = function (searchElement, fromIndex) {
    //Si existe el argumento fromIndex, empezar la busqueda ahi, si no existe será 0
    if (!fromIndex) {
        fromIndex = 0;
    }
    else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex
    }
    else if (fromIndex >= this.length) {
        return false
    }

    for (i = fromIndex; i < this.length; i++) {
        var element = this[i]

        if (element === searchElement) {
            return true
        }
    }
    return false
}

console.log('TEST Raid.prototype.includes')

console.log('CASE get number includes 300 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.includes(300)
console.log(num)
// true



console.log('CASE get number includes 8 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

var num = nums.includes(8)
console.log(num)
// false


console.log('CASE get number includes 300 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums[5] = 300
nums.length = 6

var num = nums.includes(300, -5)
console.log(num)
// true


console.log('CASE get number includes 300 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums[5] = 300
nums.length = 6

var num = nums.includes(300, -1)
console.log(num)
// true