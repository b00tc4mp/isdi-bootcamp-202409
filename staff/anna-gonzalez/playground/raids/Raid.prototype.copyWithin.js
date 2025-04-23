var Raid = function () {
    this.length = 0
}

Raid.prototype.copyWithin = function (target, start, end) {
    var shallowCopy = new Raid
    shallowCopy.length = 0

    if (target >= this.length || start >= this.length) {
        return this
    }

    var target = (-this.length <= target && target < 0) ? target + this.length :
        (target < this.length) ? 0 :
            target

    var start = (-this.length <= start && start < 0) ? start + this.length :
        (start < -this.length) ? 0 :
            start

    var end = (-this.length <= end && end < 0) ? end + this.length :
        (end >= this.length || !end) ? this.length :
            (end < -this.length) ? 0 :
                end

    if (end <= start) {
        return this
    }

    for (var i = start; i < end; i++) {
        shallowCopy[shallowCopy.length] = this[i]
        shallowCopy.length++
    }

    if (this.length < shallowCopy.length + target) {
        for (var i = 0; i < this.length - target; i++) {
            this[target + i] = shallowCopy[i]
        }
    } else {
        for (var i = 0; i < shallowCopy.length; i++) {
            this[target + i] = shallowCopy[i]
        }
    }

    return this
}

console.log('TEST Raid.prototype.copyWithin')

console.log('CASE copy to index 0 the element at index 3')

var letters = new Raid
letters[0] = 'a'
letters[1] = 'b'
letters[2] = 'c'
letters[3] = 'd'
letters[4] = 'e'
letters.length = 5

console.log(letters.copyWithin(0, 3, 4))
// { 0: 'd', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }

console.log('CASE copy to index 0 the elements between index 2 and 4')

var letters = new Raid
letters[0] = 'a'
letters[1] = 'b'
letters[2] = 'c'
letters[3] = 'd'
letters[4] = 'e'
letters.length = 5

console.log(letters.copyWithin(0, 2, 4))
// { 0: 'c', 1: 'd', 2: 'c', 3: 'd', 4: 'e', length: 5 }

console.log('CASE copy to index 1 all elements from index 3 to the end')

var letters = new Raid
letters[0] = 'a'
letters[1] = 'b'
letters[2] = 'c'
letters[3] = 'd'
letters[4] = 'e'
letters.length = 5

console.log(letters.copyWithin(1, 3))
// { 0: 'a', 1: 'd', 2: 'e', 3: 'd', 4: 'e', length: 5 }

console.log('CASE copy with negative indexes')

var letters = new Raid
letters[0] = 'a'
letters[1] = 'b'
letters[2] = 'c'
letters[3] = 'd'
letters[4] = 'e'
letters.length = 5

console.log(letters.copyWithin(-2, -3, -1))
// { 0: 'a', 1: 'b', 2: 'c', 3: 'c', 4: 'd', length: 5 }

console.log('CASE copy with target out of range')

var letters = new Raid
letters[0] = 'a'
letters[1] = 'b'
letters[2] = 'c'
letters[3] = 'd'
letters[4] = 'e'
letters.length = 5

console.log(letters.copyWithin(-20, 2, 4))
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }

console.log('CASE copy with target after start')

var letters = new Raid
letters[0] = 'a'
letters[1] = 'b'
letters[2] = 'c'
letters[3] = 'd'
letters[4] = 'e'
letters.length = 5

console.log(letters.copyWithin(4, 0, 3))
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'a', length: 5 }