var Raid = function () {
    this.length = 0
}

Raid.prototype.splice = function (start, deleteCount) {
    var removed = new Raid
    removed.length = 0

    //CASE start omitted
    if (arguments.length === 0) {
        return removed
    }

    // CASE start is undefined
    if (start === undefined) { start = 0 }

    if (arguments.length === 1) {
        for (var i = start; i < this.length; i++) {
            var element = this[i]
            delete this[i]

            removed[removed.length] = element
            removed.length++
        }
        this.length -= removed.length

        return removed
    } else if (arguments.length === 2) {
        if (deleteCount > (start + this.length - 1)) { deleteCount = thi.length - start }

        for (var i = start; i < (start + deleteCount); i++) {
            var element = this[i]

            removed[removed.length] = element
            removed.length++
        }

        // Ahora toca reajustar el iterable.

        for (var i = start + deleteCount; i < this.length; i++) {
            var element = this[i]

            this[i - deleteCount] = element
        }

        for (var i = this.length - deleteCount; i < this.length; i++) {
            delete this[i]
        }

        this.length -= removed.length

        return removed
    }

    else if (arguments.length > 2) {
        // if CASE start is negative index
        if (-this.length <= start && start < 0) { start = start + this.length }
        //else if CASE start is negative and out of index
        else if (start < -this.length) { start = 0 }

        // CASE start is equal or bigger than the iterable length
        if (start >= this.length) {
            start = this.length
            deleteCount = 0
        }

        // CASE deleteCount bigger than the iterable available space (space after start)
        if (deleteCount > (start + this.length - 1)) { deleteCount = this.length - start }

        // CASE deleteCount is negative or unedfined
        if (deleteCount < 0 || deleteCount === undefined) { deleteCount = 0 }

        // Here the function actually starts xd

        // Make the copy that we will return with the deleted items

        for (var i = start; i < (start + deleteCount); i++) {
            var element = this[i]

            removed[removed.length] = element
            removed.length++
        }

        // Readjust the iterable "moving back" the items that are left in the iterable

        for (var i = start + deleteCount; i < this.length; i++) {
            var element = this[i]

            this[i - deleteCount] = element
        }

        // Delete the necessary items

        for (var i = this.length - deleteCount; i < this.length; i++) {
            delete this[i]
        }

        // Readjust the length of the remaining iterable

        this.length -= removed.length

        // Make space for the new items

        for (var i = 0; i < arguments.length - 2; i++) {
            for (var j = this.length; j > start; j--) {
                this[j] = this[j - 1]
            }
            this.length++
        }

        // Insert the new items

        for (var i = 0; i < arguments.length - 2; i++) {
            this[i + start] = arguments[i + 2]
        }

        // Return the removed items
        return removed
    }
}

console.log('TEST Raid.prototype.splice')

console.log('CASE extract elements from index 3')


var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums[5] = 600
nums[6] = 700
nums.length = 7

var extracted = nums.splice(3)

console.log(nums)
// Raid {0: 100, 1: 200, 2: 300, length: 3}
console.log(extracted)
// Raid {0: 400, 1: 500, 2: 600, 3: 700, length: 4}

console.log('CASE extract 2 elements from index 1')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums[5] = 600
nums[6] = 700
nums.length = 7

var extracted = nums.splice(1, 2)

console.log(nums)
// Raid {0: 100, 1: 400, 2: 500, 3: 600, 4: 700, length: 5}
console.log(extracted)
// Raid {0: 200, 1: 300, length: 2}

console.log('CASE extract 3 elements from index 1 and add 3 elements')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums[5] = 600
nums[6] = 700
nums.length = 7

var extracted = nums.splice(1, 4, 800, 900, 1000)

console.log(nums)
// Raid {0: 100, 1: 800, 2: 900, 3: 1000, 4: 600, 5: 700, length: 6}
console.log(extracted)
// Raid {0: 200, 1: 300, 2: 400, 3: 500, length: 4}

console.log('CASE extract 1 element from index -7 and add 2 elements')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums[5] = 600
nums[6] = 700
nums.length = 7

var extracted = nums.splice(-7, 1, 800, 900)

console.log(nums)
// Raid {0: 800, 1: 900, 2: 200, 3: 300, 4: 400, 5: 500, 6: 600, 7: 700, length: 8}
console.log(extracted)
// Raid {0: 100, length: 1}