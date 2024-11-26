var Raid = function () {
    this.length = 0
}


Raid.prototype.lastIndexOf = function (element, fromIndex) {
    if (!fromIndex) {
        fromIndex = this.length
    }
    else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex
    }

    for (var i = fromIndex; i <= this.length; i--) {
        if (this[i] === element) {
            return i;
        }
    }
    return -1
}

console.log('TEST Raid.prototype.lastIndexOf')

console.log('CASE get number lastIndexOf -champiñon- in nums')

var nums = new Raid
nums[0] = 'potato'
nums[1] = 'zanahoria'
nums[2] = 'champiñon'
nums[3] = 'col'
nums[4] = 'pebrot'
nums[5] = 'champiñon'
nums.length = 6

var num = nums.lastIndexOf('champiñon')
console.log(num)
// 5



console.log('CASE get number lastIndexOf -albahaca- in nums')

var nums = new Raid
nums[0] = 'potato'
nums[1] = 'zanahoria'
nums[2] = 'champiñon'
nums[3] = 'col'
nums[4] = 'pebrot'
nums[5] = 'champiñon'
nums.length = 6

var num = nums.lastIndexOf('albahaca')
console.log(num)
// -1


// console.log('CASE get number lastIndexOf -champiñon- in nums')

// var nums = new Raid
// nums[0] = 'potato'
// nums[1] = 'zanahoria'
// nums[2] = 'champiñon'
// nums[3] = 'col'
// nums[4] = 'pebrot'
// nums[5] = 'champiñon'
// nums.length = 6

// var num = nums.lastIndexOf('champiñon', -1)
// console.log(num)
// // 5


// console.log('CASE get number lastIndexOf -champiñon- in nums')

// var nums = new Raid
// nums[0] = 'potato'
// nums[1] = 'zanahoria'
// nums[2] = 'champiñon'
// nums[3] = 'col'
// nums[4] = 'pebrot'
// nums[5] = 'champiñon'
// nums.length = 6

// var num = nums.lastIndexOf('champiñon', -4)
// console.log(num)
// // 2