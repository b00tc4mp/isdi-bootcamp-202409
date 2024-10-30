var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Array.prototype.fill')

Raid.prototype.fill = function(element, start, end){
    start === undefined ? start = 0 : start < 0 ? start = this.length + start : start = start
    end === undefined || end > this.length ? end = this.length : end < 0 ? end = this.length + end : end = end

    for ( i = start; i < end; i++) {
        this[i] = element
    }
    return this
}

var raid1 = new Raid(1, 2, 3, 4);
var raid2 = new Raid(1, 2, 3, 4);

// Fill with 0 from position 2 until position 4
console.log(raid1.fill(0, 2, 4));
console.log(raid1)
// Expected output: Raid {0: 1, 1: 2, 2: 0, 3: 0, length: 4}

// Fill with 5 from position 1
console.log(raid1.fill(5, 1));
console.log(raid1)
// Expected output: Raid {0: 1, 1: 5, 2: 5, 3: 5, length: 4}

console.log(raid1.fill(6));
console.log(raid1)
// Expected output: Raid {0: 6, 1: 6, 2: 6, 3: 6, length: 4}

console.log(raid2.fill(3,-3, -1))
console.log(raid2)
// Expected output: {0: 1, 1: 3, 2: 3, 3: 4, length: 4}