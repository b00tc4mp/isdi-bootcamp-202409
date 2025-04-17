var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Raid.prototype.shift')

Raid.prototype.shift = function() {
    shiftElement = this[0]
    for( var i = 0; i < this.length-1; i++){
        this[i] = this[i+1]
    }
    delete this[this.length-1]
    this.length--
    return shiftElement
}


var raid1 = new Raid('banana', 'pear', 'kiwi','pineapple')
console.log(raid1)
//Raid {0: 'banana', 1: 'pear', 2: 'kiwi', 3: 'pineapple', length: 4}

console.log('CASE delete the first element on raid1')
var extractElement = raid1.shift()
console.log(raid1)
//Raid {0: 'pear', 1: 'kiwi', 2: 'pineapple', length: 3}

console.log('and return the first element')
console.log(extractElement)
//banana