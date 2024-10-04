var Raid = function () {
    this.length = 0
}

Raid.prototype.reverse = function () {
    var reversed = []
    reversed.length = this.length
    var p = 0
    for (var i = this.length - 1; i > -1; i--) {
        reversed[p] = this[i]
        p++
    }
    for (var i = 0; i < this.length; i++) {
        this[i] = reversed[i]
    }
    return reversed
}


var count = new Raid
count[0] = "one"
count[1] = "two"
count[2] = "three"
count[3] = "four"
count[4] = "five"
count.length = 5

var countdown = count.reverse()
console.log(countdown)