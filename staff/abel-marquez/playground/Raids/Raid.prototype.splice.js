var Raid = function () {this.length = 0}

Raid.prototype.splice = function (start) {
    
    var removed = {length : 0}
    for(var i = start; i < this.length; i++) {
        var element = this[i]
        delete this[i]
        removed[removed.length] = element
        removed.length++
    }

    this.length -= removed.length
    return removed 
}







console.log('TEST splice in a Raid')

console.log('CASE extract elements from index 3')

var nums = new Raid
nums [0] = '100'
nums [1] = '200'
nums [2] = '300'
nums [3] = '400'
nums [4] = '500'
nums [5] = '600'
nums [6] = '700'
nums.length = 7

var extracted = nums.splice(3)

console.log(nums)
// {0: 100, 1: 200, 2: 300, length: 3}
console.log(extracted)
// {0: 400, 1: 500, 2: 600, 3: 700, length: 4}