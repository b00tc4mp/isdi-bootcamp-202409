var Raid = function () {
    this.length = 0
}


Raid.prototype.fill = function (value, start, end) {
    if (typeof start === "number") {
    } else {
        start = 0
    }
    if (typeof end === "number") {
    } else {
        end = this.length
    }
    for (var i = start; i < end; i++) {
        this[i] = value
    }
    return this
}

var array = new Raid
array[0] = 1
array[1] = 2
array[2] = 3
array[3] = 4
array[4] = 5
array[5] = 6
array[6] = 7
array[7] = 8
array.length = 8

var arra = array.fill(25, 3, 6)

console.log(arra)

// {
//     '0': 1,
//     '1': 2,
//     '2': 3,
//     '3': 25,
//     '4': 25,
//     '5': 25,
//     '6': 5,
//     '7': 6,
//     length: 8
//   }