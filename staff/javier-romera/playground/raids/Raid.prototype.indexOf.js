var Raid = function () {
    this.length = 0;
}

Raid.prototype.indexOf = function (searchElement, fromIndex) {
    if (!fromIndex) {
        fromIndex = 0;
    }
    else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex
    }
    for (var i = fromIndex; i < this.length; i++) {
        if (this[i] === searchElement) {
            return i
        }
    }
    return -1
}

console.log('TEST Raid.prototype.indexOf')

console.log('CASE identify index of bison')

var beasts = new Raid
beasts[0] = 'ant'
beasts[1] = 'bison'
beasts[2] = 'camel'
beasts[3] = 'duck'
beasts[4] = 'bison'
beasts.length = 5

var beastA = beasts.indexOf('bison')
var beastB = beasts.indexOf('bison', 2)

console.log(beasts)
// Raid {0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5}
console.log(beastA)
// 1
console.log(beastB)
// 4